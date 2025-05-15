import { Property } from "src/modules/properties/entities/property.entity";
import { User } from "src/modules/users/entities/users.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "reviews" })
export class Review{
    @PrimaryGeneratedColumn()
    reviewId: string;

    @Column()
    propertyId: string;

    @Column('uuid')
    tenantId: string;

    @Column()
    rating: number;

    @Column({ type: 'text' })
    content: string;

    @ManyToOne(() => User, (user) => user.reviews)
    @JoinColumn({ name: 'tenantId' })
    tenant: User;

    @ManyToOne(() => Property, (property) => property.reviews)
    @JoinColumn({ name: 'propertyId' })
    property: Property;
    
    @CreateDateColumn()
    createdAt: Date;
}