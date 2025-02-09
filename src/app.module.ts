import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import environment from './common/config/environment';
import { LoggerService } from './common/logger/logger.service';
import { AuthModule } from './auth/auth.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      load: [environment],
      isGlobal: true,
      envFilePath: '.env.dev',
    }),
    AuthModule,
    EmployeeModule,
  ],
  providers: [
    LoggerService,
  ],
  exports: [LoggerService],
})
export class AppModule {}
