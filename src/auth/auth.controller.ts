import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import AuthResponse from './auth.interface';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import RefreshTokenDto from './dto/refresh-token.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'user registration' })
  @ApiResponse({ status: 200, type: AuthResponse })
  @HttpCode(200)
  @Post('registration')
  @UsePipes(new ValidationPipe())
  async registration(@Body() dto: AuthDto) {
    return this.authService.registration(dto);
  }

  @ApiOperation({ summary: 'login' })
  @ApiResponse({ status: 200, type: AuthResponse })
  @HttpCode(200)
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'refresh access token' })
  @ApiResponse({ status: 200, type: AuthResponse })
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Post('refresh')
  async refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto);
  }
}
