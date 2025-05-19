import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../entities/payment.entity';
import { CreatePaymentDto } from '../dtos/createPayments.dto';
import { PaymentStatus } from 'src/common/enums/paymentStatus.enums';

@Injectable()
export class PaymentRepository{
    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,
    ) {}        

    // creates new Payment entry
    async createBulkPayments(createPaymentDto: CreatePaymentDto[]): Promise<Payment[]> {
        try{
            const newPayments = this.paymentRepository.create(createPaymentDto);
            return this.paymentRepository.save(newPayments);
        }catch(error){
            console.error('Error in creating new payment ', error.message);
            throw new InternalServerErrorException('Error in creating new payment');
        }
    }

    // updates payment
    async updatePayment(paymentId: string, updateData: Partial<Payment>): Promise<Payment | null> {
        try {
            await this.paymentRepository.update(paymentId, updateData);
            return this.paymentRepository.findOne({ where: { paymentId } });
        } catch(error) {
            console.error('Error updating payment', error.message);
            throw new InternalServerErrorException('Error updating payment');
        }
    }

    // finds payment by ID
    async findById(paymentId: string): Promise<Payment | null> {
        try {
            return this.paymentRepository.findOne({ where: { paymentId } });
        } catch(error) {
            console.error('Error finding payment', error.message);
            throw new InternalServerErrorException('Error finding payment');
        }
    }

    // finds payment by transaction ID
    async findByTransactionId(transactionId: string): Promise<Payment | null> {
        try {
            return this.paymentRepository.findOne({ where: { transactionId } });
        } catch(error) {
            console.error('Error finding payment by transaction ID', error.message);
            throw new InternalServerErrorException('Error finding payment by transaction ID');
        }
    }

    // fetching the payment history of Tenant
    async getPaymentHistoryOfTenant(tenantId: string){
        try{
            return await this.paymentRepository.find({
                where: { tenantId, status: PaymentStatus.COMPLETED },
                order: { paidDate: 'DESC' }
            });
        }catch(error){
            console.error('Error in fetching the payment history of tenant: ', error.message);
            throw new InternalServerErrorException('Failed to fetch the payment History of Tenant');
        }
    }

    // fetching the Upcoming payments of Tenant
    async getUpcomingPaymentsOfTenant(tenantId: string){
        try{
            return await this.paymentRepository.find({
                where: { tenantId, status: PaymentStatus.PENDING },
                order: { dueDate: 'ASC' }
            });
        }catch(error){
            console.error('Error in fetching the upcoming payments of tenant: ', error.message);
            throw new InternalServerErrorException('Failed to fetch the upcoming payments of Tenant');
        }
    }

    // fetching the payment history
    async getPaymentHistory(){
        try{
            return await this.paymentRepository.find({
                where: { status: PaymentStatus.COMPLETED },
                order: { paidDate: 'DESC' }
            });
        }catch(error){
            console.error('Error in fetching the payment history: ', error.message);
            throw new InternalServerErrorException('Failed to fetch the payment History');
        }
    }

    // fetching the Upcoming payments
    async getUpcomingPayments(){
        try{
            return await this.paymentRepository.find({
                where: { status: PaymentStatus.PENDING },
                order: { dueDate: 'ASC' }
            });
        }catch(error){
            console.error('Error in fetching the upcoming payments: ', error.message);
            throw new InternalServerErrorException('Failed to fetch the upcoming payments');
        }
    }
}