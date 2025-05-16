import { PaymentStatus } from "src/common/enums/paymentStatus.enums";
import { Agreement } from "src/modules/agreement/entities/agreement.entity";
import { User } from "src/modules/users/entities/users.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'payments' })
export class Payment{
    @PrimaryGeneratedColumn('uuid')
    paymentId: string;

    @Column('uuid')
    tenantId: string;

    @ManyToOne(() => User, (user) => user.payments)
    @JoinColumn({ name: 'tenantId'})
    tenant: User;

    @Column('uuid')
    agreementId: string;

    @ManyToOne(() => Agreement, (agreement) => agreement.payments)
    @JoinColumn({ name: 'agreementId' })
    agreement: Agreement;
    
    @Column({ nullable: true })
    transactionId: string; // Stripe transaction ID (e.g., pi_...)

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
    status: PaymentStatus;

    @Column({ default: 'stripe' }) 
    paymentMethod: string;

    @Column()
    paidDate: Date;

    @Column()
    dueDate: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}