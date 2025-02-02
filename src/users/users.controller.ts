import { Controller, Get, Post } from '@nestjs/common';
import {
  Resource,
  RoleMatchingMode,
  Roles,
  Scopes,
} from 'nest-keycloak-connect';

@Controller('users')
@Resource('users')
export class UsersController {
  @Get()
  @Roles({ roles: ['realm:admin', 'realm:manager'], mode: RoleMatchingMode.ANY })
  @Scopes('get-all')
  getUsers(): string {
    return 'List of all users (Manager / Admin access).';
  }

  @Post()
  @Roles({ roles: ['realm:admin'] })
  @Scopes('create')
  createUser(): string {
    return 'Created user (Admin access).';
  }
}
