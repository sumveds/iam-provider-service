import { Injectable } from '@nestjs/common';
import { KeycloakService } from 'src/keycloak/keycloak.service';
import { LoggerService } from 'src/common/logger/logger.service';
import { CreateEmployeeDto, EmployeeResponseDto } from './employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly keycloakService: KeycloakService,
  ) {}

  async create(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<EmployeeResponseDto> {
    try {
      const keycloakUser = this.mapToKeycloakUser(createEmployeeDto);
      this.loggerService.log(
        'create: Keycloak user:',
        JSON.stringify(keycloakUser, null, 2),
      );
      const userId = await this.keycloakService.createUser(keycloakUser);

      return this.mapToEmployeeResponse({
        id: userId,
        ...createEmployeeDto,
      });
    } catch (error) {
      this.loggerService.error('User creation failed:', error);
      throw new Error(`User creation failed: ${error.message}`);
    }
  }

  async getAll(): Promise<EmployeeResponseDto[]> {
    try {
      const users = await this.keycloakService.listUsers();
      return users.map((user) => this.mapToEmployeeResponse(user));
    } catch (error) {
      this.loggerService.error('Failed to fetch users:', error);
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  }

  private mapToKeycloakUser(dto: CreateEmployeeDto) {
    return {
      username: dto.username,
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      enabled: true,
      credentials: [
        {
          type: 'password',
          value: dto.password,
          temporary: false,
        },
      ],
    };
  }

  private mapToEmployeeResponse(employee: any): EmployeeResponseDto {
    return {
      id: employee.id,
      username: employee.username,
      email: employee.email,
      firstName: employee.firstName || undefined,
      lastName: employee.lastName || undefined,
    };
  }
}
