import { ApiProperty } from '@nestjs/swagger';

export type TypeRole = 'USER' | 'ADMIN' | undefined;

export default class AuthResponse {
  @ApiProperty({ example: 1, description: 'user id' })
  id: number;

  @ApiProperty({ example: 'test@test.ru', description: 'email' })
  email: string;

  @ApiProperty({ example: true, description: 'is admin?' })
  isAdmin: boolean;

  @ApiProperty({
    example: 'ewfwf.wefweffe.wefewf',
    description: 'access token',
  })
  accessToken: string;

  @ApiProperty({
    example: 'ewfwf.wefweffe.wefewf',
    description: 'refresh token',
  })
  refreshToken: string;
}
