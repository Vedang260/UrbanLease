import { UserRole } from "src/common/enums/roles.enums";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Notification } from "src/modules/notifications/entities/notification.entity";

@Entity({ name: 'users' })
export class User{
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Column()
    fullName: string;
    
    @Column()
    phoneNumber: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
    
    @Column({ type: 'enum', enum: UserRole })
    role: UserRole;

    @Column({ default: true })
    isActive: boolean;
    
    @OneToMany(() => Notification, (notification) => notification.user)
    notifications: Notification[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}