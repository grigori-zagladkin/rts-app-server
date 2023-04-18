import { Employee } from '@prisma/client';

export default class EmployeesResponse implements Employee {
  id: number;
  firstName: string;
  secondName: string;
  photoPath: string;
  information: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}
