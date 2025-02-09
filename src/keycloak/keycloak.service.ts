import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import KeycloakAdminClient from '@keycloak/keycloak-admin-client';
import { KeycloakUser } from 'src/common/interface/keycloak-user.interface';
import { UserRepresentation } from 'src/common/interface/user-representation.interface';
import { LoggerService } from 'src/common/logger/logger.service';

@Injectable()
export class KeycloakService implements OnModuleInit {
  private adminClient: KeycloakAdminClient;

  constructor(
    private readonly logger: LoggerService,
    private readonly configService: ConfigService,
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
      clientSecret: this.configService.get<string>(
        'KEYCLOAK_API_CLIENT_SECRET',
      ),
    });
  }

  /**
   * Create a new user in Keycloak
   * @param user - User creation payload
   * @returns Created user ID
   */
  async createUser(user: KeycloakUser, roleName: string): Promise<string> {
    try {
      const createdUser = await this.adminClient.users.create({
        realm: this.configService.get<string>('KEYCLOAK_REALM'),
        ...user,
      });
      /*this.logger.log(
        'createUser: createdUser:',
        JSON.stringify(createdUser, null, 2),
      );
      const role = await this.adminClient.roles.findOneByName({
        name: roleName,
      });
      this.logger.log('createUser: role:', JSON.stringify(role, null, 2));
      const roleMap = {
        id: createdUser.id!,
        roles: [
          {
            id: role.id!,
            name: role.name!,
          },
        ],
      };
      this.logger.log(
        'createUser: role map:',
        JSON.stringify(roleMap, null, 2),
      );
      await this.adminClient.users.addRealmRoleMappings(roleMap);
      this.logger.log('createUser: role mapping done.');*/
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
