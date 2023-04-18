import { IsBoolean, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  isAdmin: boolean;
}
