import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}