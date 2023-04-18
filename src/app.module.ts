import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { UsersModule } from './users/users.module';
import { CompetenciesModule } from './competencies/competencies.module';
import { DevelopmentsModule } from './developments/developments.module';
import { EmployeesModule } from './employees/employees.module';
import { CoursesModule } from './courses/courses.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AuthModule,
    FilesModule,
    UsersModule,
    CompetenciesModule,
    DevelopmentsModule,
    EmployeesModule,
    CoursesModule,
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
