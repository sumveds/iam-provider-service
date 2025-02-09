import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import { LoggerService } from 'src/common/logger/logger.service';
import { KeycloakService } from './keycloak.service';

@Module({
  imports: [
    HttpModule,
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
  providers: [
    LoggerService,
    KeycloakService,
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: ResourceGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
  ],
  exports: [KeycloakConnectModule, KeycloakService],
})
export class KeycloakModule {}
