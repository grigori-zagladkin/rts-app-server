import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({ example: 'test@test.ru', description: 'user email' })
  @IsEmail({}, { message: 'email should be a correct' })
  @IsString({ message: 'email should be a string' })
  email: string;

  @ApiProperty({ example: 'wfgewrgegregregeger', description: 'user password' })
  @IsString({ message: 'password should be a string' })
  password: string;
}
