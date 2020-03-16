import { Repository, EntityRepository } from "typeorm";
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Query } from "@nestjs/common";
import { User } from '../auth/user.entity';

@EntityRepository(Appointment)
export class AppointmentRepository extends Repository<Appointment> {

    async getAppointments(
        user: User
    ): Promise <Appointment[]>{
        const query = this.createQueryBuilder('appointment');

        query.where('appointment.userId = :userId', { userId: user.id});

        const appointments = await query.getMany();
        return appointments;
    }

    /**FUNCTION - asynchronous: Uses the destructuring notation to get the attributes from the DTO, then creates a new Object using the Entity model
     * Once the Object is filled it saves it in the database and returns it
     * PARAMS: createAppointmentDTO: CreateAppointmentDto
     * TYPE: Promise<Appointment>
     */
    async createAppointment(
        createAppointmentDto: CreateAppointmentDto,
        user: User
        ): Promise<Appointment>{
        const { patient, clinician } = createAppointmentDto;

        const appointment = new Appointment();
        appointment.patient = patient;
        appointment.clinician = clinician;
        appointment.user = user;
        await appointment.save()

        return appointment;
    }

}