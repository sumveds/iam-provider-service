import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { LoggerService } from 'src/common/logger/logger.service';

@Injectable()
export class AuthService {
  private keycloakDomain = this.configService.get<string>('KEYCLOAK_DOMAIN');
  private realm = this.configService.get<string>('KEYCLOAK_REALM');
  private clientId = this.configService.get<string>('KEYCLOAK_API_CLIENT_ID');
  private clientSecret = this.configService.get<string>(
    'KEYCLOAK_API_CLIENT_SECRET',
  );

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly logger: LoggerService,
  ) {}

  async authenticate(username: string, password: string): Promise<any> {
    const data = new URLSearchParams();
    data.append('client_id', this.clientId);
    data.append('client_secret', this.clientSecret);
    data.append('grant_type', 'password');
    data.append('scope', 'openid');
    data.append('username', username);
    data.append('password', password);

    try {
      const url =
        this.keycloakDomain +
        `/realms/${this.realm}/protocol/openid-connect/token`;
      const response = await firstValueFrom(
        this.httpService.post(url, data, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }),
      );

      return response.data;
    } catch (error) {
      throw new Error(`Keycloak authentication failed: ${error.message}`);
    }
  }
}
