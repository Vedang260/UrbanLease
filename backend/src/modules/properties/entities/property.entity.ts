import { PropertyType } from "src/common/enums/propertyType.enums";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Address } from "./address.entity";
import { Feature } from "./feature.entity";
import { User } from "src/modules/users/entities/users.entity";
import { RentalPeriod } from "src/common/enums/rentalPeroid.enums";
import { PropertyStatus } from "src/common/enums/propertyStatus.enums";

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

  @Column('boolean', { default: false })
  isFurnished: boolean;

  @Column('boolean', { default: false })
  isAvailable: boolean;

  @Column('float')
  rentAmount: number;

  @Column({ type: 'enum', enum: RentalPeriod })
  rentalPeriod: RentalPeriod

  @Column('text', { array: true})
  images: string[];

  @ManyToMany(() => Feature, { cascade: true })
  @JoinTable()
  features: Feature[]; 

  @ManyToOne(() => User, (user) => user.properties, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column({ type: 'enum', enum: PropertyStatus})
  status: PropertyStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}