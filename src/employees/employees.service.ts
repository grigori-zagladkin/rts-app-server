import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import EmployeesDto from './employees.dto';

@Injectable()
export class EmployeesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getEmployeeBySlug(slug: string) {
    return await this.prismaService.employee.findUniqueOrThrow({
      where: { slug },
      //   select: {
      //   }
    });
  }

  async getAllEmployees() {
    return await this.prismaService.employee.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async createEmployees() {
    return await this.prismaService.employee
      .create({
        data: {
          firstName: '',
          secondName: '',
          information: '',
          photoPath: '',
          slug: '',
        },
      })
      .then((data) => data.id);
  }

  async getEmployeeById(id: number) {
    return await this.prismaService.employee.findUniqueOrThrow({
      where: { id },
    });
  }

  async updateEmployee(id: number, dto: EmployeesDto) {
    const employee = await this.getEmployeeById(id);
    return await this.prismaService.employee.update({
      where: { id },
      data: { ...dto },
    });
  }

  async deleteEmployee(id: number) {
    const employee = await this.getEmployeeById(id);
    return await this.prismaService.employee.delete({ where: { id } });
  }
}
