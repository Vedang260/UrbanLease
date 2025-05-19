import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '../entities/payment.entity';
import { PaymentsController } from '../controllers/payments.controller';
import { PaymentService } from '../services/payments.service';
import { PaymentRepository } from '../repositories/payments.repository';
import { WebhookController } from '../controllers/webhook.controller';
import { BullModule } from '@nestjs/bull';
import { PaymentsProcessor } from '../processor/payments.processor';

@Module({
    imports: [TypeOrmModule.forFeature([Payment]),
        BullModule.registerQueue({
            name: 'paymentsQueue',
        }),
    ],
  controllers: [PaymentsController, WebhookController],
  providers: [PaymentService, PaymentRepository, PaymentsProcessor ],
  exports: [PaymentService, PaymentRepository, BullModule ],
})
export class PaymentModule {} 