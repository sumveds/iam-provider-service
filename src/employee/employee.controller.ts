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
import { CreateEmployeeDto, EmployeeResponseDto } from './employee.dto';
import { EmployeeService } from './employee.service';

@Controller('employees')
@Resource('employees')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles({
    roles: ['realm:admin', 'realm:employee'],
    mode: RoleMatchingMode.ANY,
  })
  @Scopes('read')
  async getAll(): Promise<EmployeeResponseDto[]> {
    return await this.employeeService.getAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles({
    roles: ['realm:admin'],
    mode: RoleMatchingMode.ANY,
  })
  @Scopes('write')
  async create(
    @Body() createUserDto: CreateEmployeeDto,
  ): Promise<EmployeeResponseDto> {
    return await this.employeeService.create(createUserDto);
  }
}
