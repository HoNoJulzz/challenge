import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentRepository } from './appointment.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class AppointmentsService {
    constructor(
        @InjectRepository(AppointmentRepository)
        private appointmentRepository: AppointmentRepository
    ){}
    
    async getAllAppointments(
        user: User
    ){
        return this.appointmentRepository.getAppointments(user);
    }

    /** FUNCTION - asynchronous: searches in the DB for an appointment that matches a criteria (id) and returns it
     * or throws a NotFoundExceptions
     * PARAMS: id: number
     * TYPE: Promise<Appointment>
     */
    async getAppointmentById(id: number): Promise<Appointment>{
        const found = await this.appointmentRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`Appointment with ID: "${id}" not found`);
        }

        return found;
    }

    /**FUNCTION - asynchronous: uses the appointment repository as an abstraction layer for data persistance
     * PARAMS: createAppointMentDto: CreateAppointmentDto
     * TYPE: Promise<Appointment>
     */
    async createAppointment(
        createAppointmentDto: CreateAppointmentDto,
        user: User
    ): Promise<Appointment> {
        return this.appointmentRepository.createAppointment(createAppointmentDto, user);
    }

    /**FUNCTION = asynchronous: searches in the DB for an appointment that matches a criteria (id) and deletes it
     * or throws a NotFoundException
     * PARAMS: id: number
     * TYPE: Promise<void>
     */
    async deleteAppointment(id: number): Promise<void>{
        const result = await this.appointmentRepository.delete(id);

        if(result.affected === 0){
            throw new NotFoundException(`Appointment with ID: "${id}" not found`);
        }
    }
}
