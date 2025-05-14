import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'locations'})
export class Location{

    @PrimaryGeneratedColumn('uuid')
    locationId: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
}