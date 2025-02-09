import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import environment from './config/environment';
import { LoggerService } from './logger/logger.service';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
import { KeycloakService } from './keycloak/keycloak.service';
import { EmployeeController } from './employee/employee.controller';
import { EmployeeService } from './employee/employee.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      load: [environment],
      isGlobal: true,
      envFilePath: '.env.dev',
    }),
    KeycloakConnectModule.registerAsync({
      imports: [ConfigModule, HttpModule],
      useFactory: async (configService: ConfigService) => ({
        authServerUrl: configService.get<string>('KEYCLOAK_DOMAIN'),
        realm: configService.get<string>('KEYCLOAK_REALM'),
        clientId: configService.get<string>('KEYCLOAK_API_CLIENT_ID'),
        secret: configService.get<string>('KEYCLOAK_API_CLIENT_SECRET'),
      }),
      inject: [ConfigService, HttpService],
    }),
  ],
  controllers: [AppController, EmployeeController],
  providers: [
    LoggerService,
    KeycloakService,
    AppService,
    EmployeeService,
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: ResourceGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
  ],
  exports: [LoggerService],
})
export class AppModule {}
