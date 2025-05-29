import { Payment } from "src/modules/payments/entities/payment.entity";
import { Property } from "src/modules/properties/entities/property.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @ManyToOne(() => Property, (property) => property.agreements)
    @JoinColumn({ name: 'propertyId' })
    property: Property;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}