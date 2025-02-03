import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  Resource,
  RoleMatchingMode,
  Roles,
  Scopes,
} from 'nest-keycloak-connect';
import { CreateUserDto, UserResponseDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
@Resource('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles({
    roles: ['realm:admin', 'realm:manager'],
    mode: RoleMatchingMode.ANY,
  })
  @Scopes('get-all')
  async getUsers(): Promise<UserResponseDto[]> {
    return this.usersService.getAllUsers();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles({ roles: ['realm:admin'] })
  @Scopes('create')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.createUser(createUserDto);
  }
}
