import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { hash, verify } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';
import RefreshTokenDto from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);
    const tokens = await this.issuePairTokens(user);
    return {
      ...tokens,
      user: this.getUserInfo(user),
    };
  }

  async registration(dto: AuthDto) {
    const candidate = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!candidate) {
      const user = await this.userService.createUser({
        email: dto.email,
        password: await hash(dto.password),
        isAdmin: false,
      });
      return {
        ...this.getUserInfo(user),
      };
    } else {
      throw new HttpException('user is already exist', HttpStatus.BAD_REQUEST);
    }
  }

  async refresh({ refreshToken }: RefreshTokenDto) {
    if (!refreshToken) {
      throw new UnauthorizedException('Please sign in!');
    }
    const result = await this.jwtService.verifyAsync(refreshToken);
    if (!result) {
      throw new UnauthorizedException('invalid token or expired');
    } else {
      const user = await this.userService.getUserById(result.id);
      const tokens = await this.issuePairTokens(user);
      return {
        ...tokens,
        user: this.getUserInfo(user),
      };
    }
  }

  private async validateUser(dto: AuthDto) {
    const candidate = await this.prismaService.user.findFirst({
      where: { email: dto.email },
    });
    if (candidate && (await verify(candidate.password, dto.password))) {
      return candidate;
    } else {
      throw new UnauthorizedException('not valid auth data');
    }
  }

  private async issuePairTokens(user: User) {
    const payload = this.getUserInfo(user);
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload),
    };
  }

  private getUserInfo(user: User) {
    return {
      id: user.id,
      email: user.email,
      isAdmin: user.role === 'ADMIN',
    };
  }
}
