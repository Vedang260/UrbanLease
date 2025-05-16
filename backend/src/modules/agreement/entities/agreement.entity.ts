import { Payment } from "src/modules/payments/entities/payment.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'agreements'})
export class Agreement{
    @PrimaryGeneratedColumn()
    agreementId: string

    @Column('uuid')
    tenantId: string;

    @Column('uuid')
    propertyId: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    agreementUrl: string;

    @OneToMany(() => Payment, (payment) => payment.agreement)
    payments: Payment[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}