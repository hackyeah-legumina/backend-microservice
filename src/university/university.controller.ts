import { Controller, Get, Param, Query } from '@nestjs/common';
import { UniversityService } from './university.service';
import { UniversityDto } from './dtos/university.dto';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('universities')
export class UniversityController {
    constructor(private readonly universityService: UniversityService) {}

    @Get(':id')
    @ApiResponse({ type: UniversityDto })
    async findById(@Param('id') id: string): Promise<UniversityDto> {
        return this.universityService.findById(id);
    }

    @Get()
    @ApiResponse({ type: [UniversityDto] })
    @ApiQuery({
        name: 'order',
        isArray: true,
        enum: [
            'name:asc',
            'name:desc',
            'type:asc',
            'type:desc',
            'createdAt:asc',
            'createdAt:desc',
        ],
    })
    @ApiQuery({
        name: 'filter',
        isArray: true,
        enum: ['city:*', 'type:*'],
    })
    async paginate(
        @Query('skip') skip?: string,
        @Query('take') take?: string,
        @Query('order') order?: string | string[],
        @Query('filter') filter?: string | string[],
    ) {
        return this.universityService.paginate(
            +skip || 0,
            +take || 10,
            order || ['name:asc'],
            filter || [],
        );
    }
}
