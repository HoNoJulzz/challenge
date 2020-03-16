import { Controller, Get, Post, Body, Param, Delete, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Appointment } from './appointment.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('appointments')
@UseGuards(AuthGuard())
export class AppointmentsController {
    constructor(private appointmentsService: AppointmentsService){}

    @Get()
    getAllAppointments(
        @GetUser() user: User
    ): Promise<Appointment[]>{
        return this.appointmentsService.getAllAppointments(user);
    }

    @Get('/:id')
    getAppointmentById(@Param('id', ParseIntPipe) id: number): Promise<Appointment>{
        return this.appointmentsService.getAppointmentById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createAppointment(
        @Body()createAppointmentDto: CreateAppointmentDto,
        @GetUser() user: User,    
    ): Promise<Appointment>{
        return this.appointmentsService.createAppointment(createAppointmentDto, user);
    }

    @Delete('/:id')
    deleteAppointment(@Param('id', ParseIntPipe) id: number): Promise<void>{
        return this.appointmentsService.deleteAppointment(id);
    }

}