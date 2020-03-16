import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Appointment } from '../appointments/appointment.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role: string;

    @Column()
    firstName: string;
    
    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(type => Appointment, appointment => appointment.user, { eager: true})
    appointment: Appointment[]

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}