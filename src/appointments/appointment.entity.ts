import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from '../auth/user.entity';

@Entity()
export class Appointment extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    patient: string;

    @Column()
    clinician: string;

    @ManyToOne(type => User, user => user.appointment, { eager: false})
    user: User;

    @Column()
    userId: number;
}