import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from './logger/logger.service';

@Injectable()
export class AppService {
  private readonly logger = new LoggerService(AppService.name);
  constructor(private readonly config: ConfigService) {}
  getHello(): string {
    const keycloakDomain = this.config.get('environment.keycloak.domain');
    this.logger.log(`Using Keycloak domain: ${keycloakDomain}`);
    return 'Hello World!';
  }
}
