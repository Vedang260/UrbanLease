import { ApplicationStatus } from 'src/common/enums/applicationStatus.enums';
import { Property } from 'src/modules/properties/entities/property.entity';
import { User } from 'src/modules/users/entities/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';


@Entity({ name: 'rental_applications' })
export class RentalApplication {
    @PrimaryGeneratedColumn('uuid')
    rentalApplicationId: string;

    // 🔗 Tenant
    @Column('uuid')
    tenantId: string;

    @ManyToOne(() => User, user => user.rentalApplications)
    @JoinColumn({ name: 'tenantId' })
    tenant: User;

    // 🔗 Property
    @Column('uuid')
    propertyId: string;

    @ManyToOne(() => Property, property => property.rentalApplications)
    @JoinColumn({ name: 'propertyId' })
    property: Property;

    // 🧾 Personal Info
    @Column()
    fullName: string;

    @Column({ type: 'date' })
    dateOfBirth: Date;

    @Column()
    phoneNumber: string;

    @Column()
    email: string;

    @Column()
    currentAddress: string;

    @Column({ nullable: true })
    governmentIdType: string; // e.g. Aadhar, Passport

    @Column({ nullable: true })
    governmentIdNumber: string;

    @Column()
    governmentPhotoId: string;

    // 🏢 Employment Info
    @Column()
    jobTitle: string;

    @Column('decimal', { precision: 10, scale: 2 })
    monthlyIncome: number;

    @Column()
    employmentDuration: string;

    @Column()
    employerContact: string;

    // 💳 Financial Docs (optional file URLs)
    @Column({ nullable: true })
    incomeProofUrl: string;

    // 👨‍👩‍👧 Occupants & Pets
    @Column('int')
    numberOfOccupants: number;

    @Column({ type: 'text', nullable: true })
    occupantDetails: string; // names & ages

    @Column({ default: false })
    hasPets: boolean;

    @Column({ nullable: true })
    petDetails: string;

    // 📝 Additional Fields
    @Column({ nullable: true })
    message: string;

    @Column({
        type: 'enum',
        enum: ApplicationStatus,
        default: ApplicationStatus.PENDING,
    })
    status: ApplicationStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
