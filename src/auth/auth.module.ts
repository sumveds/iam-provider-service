import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoggerService } from 'src/common/logger/logger.service';

@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [LoggerService, AuthService],
})
export class AuthModule {}
