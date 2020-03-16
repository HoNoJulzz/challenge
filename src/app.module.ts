import { Module } from '@nestjs/common';
import { AppointmentsModule } from './appointments/appointments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AppointmentsModule,
    AuthModule
  ],
})
export class AppModule {}
