import { Controller } from '@nestjs/common';
import { CompetenciesService } from './competencies.service';

@Controller('competencies')
export class CompetenciesController {
  constructor(private readonly competenciesService: CompetenciesService) {}
}
