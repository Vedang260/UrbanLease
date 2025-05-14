import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'address' })
export class Address{

    @PrimaryGeneratedColumn('uuid')
    addressId: string;

    @Column()
    street: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    country: string;
    
    @Column()
    zipcode: string;
}