import { UserRole } from "src/common/enums/roles.enums";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Notification } from "src/modules/notifications/entities/notification.entity";
import { Property } from "src/modules/properties/entities/property.entity";
import { Review } from "src/modules/reviewes/entities/review.entity";
import { RentalApplication } from "src/modules/rentals/entities/rentalApplication.entity";
import { Payment } from "src/modules/payments/entities/payment.entity";

@Entity({ name: 'users' })
export class User{
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Column()
    fullName: string;
    
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
    
    @Column({ type: 'enum', enum: UserRole })
    role: UserRole;

    @Column({ default: true })
    isActive: boolean;
    
    @OneToMany(() => Notification, (notification) => notification.user)
    notifications: Notification[];

    @OneToMany(() => Property, (property) => property.owner)
    properties: Property[];

    @OneToMany(() => Review, (review) => review.tenant)
    reviews: Review[];
    
    @OneToMany(() => RentalApplication, (rentalApplication) => rentalApplication.tenant)
    rentalApplications: RentalApplication[];
   
    @OneToMany(() => Payment, (payment) => payment.tenant)
    payments: Payment[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}