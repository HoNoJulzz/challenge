import { IsNotEmpty } from 'class-validator';

export class CreateAppointmentDto {
    @IsNotEmpty()
    patient: string;

    @IsNotEmpty()
    clinician: string;
}