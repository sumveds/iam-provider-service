import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import KeycloakAdminClient from '@keycloak/keycloak-admin-client';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class KeycloakService implements OnModuleInit {
  private adminClient: KeycloakAdminClient;

  constructor(
    private readonly logger: LoggerService,
    private readonly configService: ConfigService
  ) {
    this.adminClient = new KeycloakAdminClient({
      baseUrl: this.configService.get<string>('KEYCLOAK_DOMAIN'),
      realmName: this.configService.get<string>('KEYCLOAK_REALM'),
    });
  }

  async onModuleInit() {
    await this.authenticate();
  }

  private async authenticate() {
    await this.adminClient.auth({
      grantType: 'client_credentials',
      clientId: this.configService.get<string>('KEYCLOAK_API_CLIENT_ID'),
      clientSecret: this.configService.get<string>('KEYCLOAK_API_CLIENT_SECRET'),
    });
  }

  /**
   * Create a new user in Keycloak
   * @param user - User creation payload
   * @returns Created user ID
   */
  async createUser(user: KeycloakUser): Promise<string> {
    try {
      const createdUser = await this.adminClient.users.create({
        realm: this.configService.get<string>('KEYCLOAK_REALM'),
        ...user,

      });
      return createdUser.id;
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  /**
   * List all users in the realm
   * @returns Array of user objects
   */
  async listUsers(): Promise<UserRepresentation[]> {
    try {
      return this.adminClient.users.find({
        realm: this.configService.get<string>('KEYCLOAK_REALM'),
      });
    } catch (error) {
      throw new Error(`Failed to list users: ${error.message}`);
    }
  }
}

// Type definitions
interface KeycloakUser {
  username: string;
  email: string;
  enabled?: boolean;
  firstName?: string;
  lastName?: string;
  credentials?: Credential[];
  attributes?: Record<string, any>;
}

interface Credential {
  type: string;
  value: string;
  temporary?: boolean;
}

// Keycloak's built-in type for user representation
interface UserRepresentation {
  id?: string;
  username?: string;
  email?: string;
  enabled?: boolean;
  firstName?: string;
  lastName?: string;
  attributes?: Record<string, any>;
}
