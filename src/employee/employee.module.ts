import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LoggerService } from 'src/common/logger/logger.service';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { KeycloakModule } from 'src/keycloak/keycloak.module';
import { KeycloakService } from 'src/keycloak/keycloak.service';

@Module({
  imports: [HttpModule, KeycloakModule],
  controllers: [EmployeeController],
  providers: [LoggerService, KeycloakService, EmployeeService],
})
export class EmployeeModule {}
