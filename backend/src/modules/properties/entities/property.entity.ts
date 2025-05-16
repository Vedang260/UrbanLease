import { PropertyType } from "src/common/enums/propertyType.enums";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Address } from "./address.entity";
import { Location } from "./location.entity";
import { Feature } from "./feature.entity";
import { User } from "src/modules/users/entities/users.entity";
import { RentalPeriod } from "src/common/enums/rentalPeroid.enums";
import { PropertyStatus } from "src/common/enums/propertyStatus.enums";
import { Review } from "src/modules/reviewes/entities/review.entity";
import { RentalApplication } from "src/modules/rentals/entities/rentalApplication.entity";

@Entity({ name: 'property' })
export class Property {
    @PrimaryGeneratedColumn('uuid')
    propertyId: string;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column({
      type: 'enum',
      enum: PropertyType,
    })
    propertyType: PropertyType;

    @Column('uuid')
    addressId: string;

    @ManyToOne(() => Address, { cascade: true })
    @JoinColumn({ name: 'addressId' })
    address: Address; // References Address entity

    @Column('uuid')
    locationId: string;

    @OneToOne(() => Location, { cascade: true, nullable: true })
    @JoinColumn({ name: 'locationId' })
    location: Location; // References Location entity (nullable for properties without coordinates)

    @Column('float')
    areaSqft: number;

    @Column('int', { nullable: true })
    numberOfBedrooms: number;

    @Column('int', { nullable: true })
    numberOfBathrooms: number;

    @Column('int', { default: 0 })
    numberOfBalconies: number;

    @Column('float')
    rentAmount: number;

    @Column('float')
    depositAmount: number;

    @Column({ type: 'enum', enum: RentalPeriod })
    rentalPeriod: RentalPeriod

    @Column('text', { array: true})
    images: string[];

    @Column()
    phoneNumber: string;
    
    @ManyToMany(() => Feature, { cascade: true })
    @JoinTable({
        name: 'property_features',
        joinColumn: { name: 'propertyId', referencedColumnName: 'propertyId' },
        inverseJoinColumn: { name: 'featureId', referencedColumnName: 'featureId' },
    })
    features: Feature[]; 

    @ManyToOne(() => User, (user) => user.properties, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'ownerId' })
    owner: User;

    @OneToMany(() => RentalApplication, (rentalApplication) => rentalApplication.property, { onDelete: 'CASCADE' })
    rentalApplications: RentalApplication[];

    @Column({ type: 'enum', enum: PropertyStatus, default: PropertyStatus.PENDING_APPROVAL})
    status: PropertyStatus;

    @OneToMany(() => Review, (review) => review.property)
    reviews: Review[]
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}