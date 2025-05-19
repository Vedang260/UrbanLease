import { Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentRepository } from '../repositories/payments.repository';
import { PaymentStatus } from '../../../common/enums/paymentStatus.enums';
import * as dotenv from 'dotenv';
import { CreatePaymentDto } from '../dtos/createPayments.dto';

dotenv.config();

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    private paymentRepository: PaymentRepository,
  ) {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if(stripeKey){
        this.stripe = new Stripe(stripeKey, {
            apiVersion: '2025-04-30.basil',
        });
    }
  }

  async createCheckoutSession(paymentId: string) {
    try {
        const payment = await this.paymentRepository.findById(paymentId);

        if (!payment) throw new Error('Payment not found');
  
        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                price_data: {
                    currency: 'inr',
                    product_data: {
                    name: `Monthly Rent for ${payment.dueDate.toDateString()}`,
                    },
                    unit_amount: Math.round(payment.amount * 100), // Stripe uses paisa (smallest currency unit)
                },
                quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:5173/customer/payment-success?paymentId=${payment.paymentId}`,
            cancel_url: `http://localhost:5173/customer/payment-failed`,
            metadata: {
                paymentId: payment.paymentId,
                tenantId: payment.tenantId,
                amount: payment.amount,
                dueDate: payment.dueDate.toISOString(),
            },
        });

      await this.paymentRepository.updatePayment(payment.paymentId, {
        transactionId: session.id,
      });

      console.log("Sending Response: ",session.id, session.url);

      return {
        success: true,
        sessionId: session.id,
        url: session.url, 
      };

    } catch (error: any) {
      console.error(`Checkout session error: ${error.message}`);
      return{
        success: false
      }
    }
  }

  async handleWebhookEvent(payload: Buffer, signature: string) {
    const event = this.stripe.webhooks.constructEvent(
      payload,
      signature,
      "whsec_8fc625696bc365c245581807ba4e83288eca6eed4cfe6b96583571b459d12894"
    );

    switch (event.type) {
      case 'checkout.session.completed':
        return this.handleCheckoutSessionCompleted(event.data.object);
      case 'checkout.session.async_payment_succeeded':
        return this.handlePaymentSuccess(event.data.object);
      case 'checkout.session.async_payment_failed':
        return this.handlePaymentFailure(event.data.object);
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  }

  private async handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
    console.log(`Session completed: ${session.id}`);
    // Immediate payment methods (like cards) will be paid here
    if (session.payment_status === 'paid') {
      await this.handlePaymentSuccess(session);
    }
  }

  private async handlePaymentSuccess(session: Stripe.Checkout.Session) {
    console.log(`Payment succeeded: ${session.id}`);
  
    if (session.metadata) {
      await this.paymentRepository.updatePayment(session.metadata.paymentId, {
        status: PaymentStatus.COMPLETED,
        paidDate: new Date(),
        transactionId: session.payment_intent?.toString() || session.id,
      });
    }
  }

  private async handlePaymentFailure(session: Stripe.Checkout.Session) {
    console.warn(`Payment failed: ${session.id}`);
    if(session.metadata){
        await this.paymentRepository.updatePayment(session.metadata.paymentId, {
            status: PaymentStatus.FAILED,
        });
    }
  }

  async getPaymentDetails(paymentId: string){
    try{
      const payment = await this.paymentRepository.findById(paymentId);
      return{
        success: true,
        message: 'Your Transaction was successfull',
        payment: payment
      }
    }catch(error){
      console.error('Error in fetching the Payment Details: ', error.message);
      return{
        success: false,
        message: 'Your Transaction was not successfull',
        payment: null
      }
    }
  }

    async createBulkPayments(paymentsDto: CreatePaymentDto[]){
        try{
            const payments = await this.paymentRepository.createBulkPayments(paymentsDto);
        }catch(error){
            console.error('Error in creating bulk payments: ', error.message);
        }
    }
}