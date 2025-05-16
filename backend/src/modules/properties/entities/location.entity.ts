import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'locations'})
export class Location{

    @PrimaryGeneratedColumn('uuid')
    locationId: string;

    @Column({ type: 'double precision' })
    latitude: number;

    @Column({ type: 'double precision' })
    longitude: number;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
}