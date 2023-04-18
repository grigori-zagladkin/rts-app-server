import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import DevelopmentDto from './development.dto';

@Injectable()
export class DevelopmentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getDevelopmentBySlug(slug: string) {
    return await this.prismaService.development.findUniqueOrThrow({
      where: { slug },
      //   select: {
      //     partnerLinks: {
      //         where: {
      //             d
      //         }
      //     }
      //   }
    });
  }

  async getAllDevelopments() {
    return await this.prismaService.development.findMany();
  }

  async createDevelopment() {
    return await this.prismaService.development
      .create({
        data: {
          description: '',
          title: '',
          slug: '',
        },
      })
      .then((data) => data.id);
  }

  async getDevelopmentById(id: number) {
    return await this.prismaService.development.findUniqueOrThrow({
      where: { id },
    });
  }

  async updateDevelopment(id: number, dto: DevelopmentDto) {
    const development = await this.getDevelopmentById(id);
    return await this.prismaService.development.update({
      where: { id },
      data: { ...dto },
    });
  }

  async deleteDevelopment(id: number) {
    const development = await this.getDevelopmentById(id);
    return await this.prismaService.development.delete({
      where: { id },
    });
  }
}
