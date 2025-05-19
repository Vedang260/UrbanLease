import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { PaymentService } from '../services/payments.service';
import { CreatePaymentDto } from '../dtos/createPayments.dto';
import { CreatePaymentPeriodDto } from '../dtos/createPaymentPeriod.dto';

@Processor('paymentsQueue')
export class PaymentsProcessor {
  
    constructor(
        private readonly paymentService: PaymentService,
    ) {}

    @Process('processPayments') // Job Name
    async processPayments(job: Job<{ createPaymentPeriodDto: CreatePaymentPeriodDto}>) {
        try{
            const { createPaymentPeriodDto } = job.data;
            console.log('Data for payments is received from the queue: ', createPaymentPeriodDto);

            const {
                tenantId,
                agreementId,
                amount,
                startDate: rawStartDate,
                rentalDuration
            } = createPaymentPeriodDto;

            // Convert startDate string to a Date object
            const startDate = new Date(rawStartDate);

            const payments: CreatePaymentDto[] = [];

            for (let i = 0; i < rentalDuration; i++) {
                const dueDate = new Date(
                    startDate.getFullYear(),
                    startDate.getMonth() + i,
                    startDate.getDate()
                );

                payments.push({
                    tenantId,
                    agreementId,
                    amount,
                    dueDate
                });
            }


        // Call your bulk creation service
        await this.paymentService.createBulkPayments(payments);
            
        }catch(error){
            console.error('Error in payments processor: ', error.message);
        }
    }
}