import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async createUser(dto: UserDto) {
    return await this.prismaService.user.create({
      data: {
        ...dto,
        role: dto.isAdmin === true ? 'ADMIN' : 'USER',
      },
    });
  }
  async getAllUsers() {
    return await this.prismaService.user.findMany();
  }
  async getUserById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
  async updateUser(id: number, dto: UserDto) {
    const user = await this.getUserById(id);
    if (user) {
      return await this.prismaService.user.update({
        where: { id },
        data: {
          ...dto,
          role: dto.isAdmin === true ? 'ADMIN' : 'USER',
        },
      });
    }
  }
  async deleteUser(id: number) {
    const user = await this.getUserById(id);
    if (user) {
      return await this.prismaService.user.delete({
        where: { id },
      });
    }
  }
}
