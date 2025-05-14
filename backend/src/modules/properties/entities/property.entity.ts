import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'property' })
export class Property{
    @PrimaryGeneratedColumn()
    propertyId: string;

    @Column('uuid')
    ownerId: string;

    @Column('uuid')
    addressId: string;

    @Column('uuid')
    locationId: string;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
}