import { Injectable } from '@nestjs/common';
import { KeycloakService } from 'src/keycloak/keycloak.service';
import { CreateUserDto, UserResponseDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly keycloakService: KeycloakService) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      const keycloakUser = this.mapToKeycloakUser(createUserDto);
      const userId = await this.keycloakService.createUser(keycloakUser);
      
      return this.mapToUserResponse({
        id: userId,
        ...createUserDto
      });
    } catch (error) {
      throw new Error(`User creation failed: ${error.message}`);
    }
  }

  async getAllUsers(): Promise<UserResponseDto[]> {
    try {
      const users = await this.keycloakService.listUsers();
      return users.map(user => this.mapToUserResponse(user));
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  }

  private mapToKeycloakUser(dto: CreateUserDto) {
    return {
      username: dto.username,
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      enabled: true,
      credentials: [{
        type: 'password',
        value: dto.password,
        temporary: false
      }]
    };
  }

  private mapToUserResponse(user: any): UserResponseDto {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName || undefined,
      lastName: user.lastName || undefined
    };
  }
}