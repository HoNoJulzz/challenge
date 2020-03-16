import { TypeOrmModuleOptions } from '@nestjs/typeorm';

/** DB connection configuration */
export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres', 
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'appointmanagement',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true // not recommended for production 
};