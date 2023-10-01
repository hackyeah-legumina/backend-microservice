import { Module } from '@nestjs/common';
import { UniversityService } from './university.service';
import { UniversityController } from './university.controller';
import { UniversityDao } from './university.dao';

@Module({
    providers: [UniversityService, UniversityDao],
    controllers: [UniversityController],
})
export class UniversityModule {}
