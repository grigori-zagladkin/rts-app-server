import { Injectable } from '@nestjs/common';
import { Competence, EmployeesOnCompetencies } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompetenciesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllCompetencies(): Promise<Array<Competence>> {
    return await this.prismaService.competence.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getCompetenceBySlug(slug: string): Promise<Competence | null> {
    return await this.prismaService.competence.findUniqueOrThrow({
      where: { slug },
    });
  }

  async getEmployeeCompetencies(
    employeeId,
  ): Promise<Array<EmployeesOnCompetencies>> {
    return await this.prismaService.employeesOnCompetencies.findMany({
      where: { employeeId },
    });
  }

  async getCompetenceById(id: number): Promise<Competence | null> {
    return await this.prismaService.competence.findUniqueOrThrow({
      where: { id },
    });
  }
}
