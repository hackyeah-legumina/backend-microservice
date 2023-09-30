import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { DictsService } from './dicts.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('dicts')
export class DictsController {
    constructor(private readonly dictsService: DictsService) {}

    @Public()
    @Get('cities')
    @ApiResponse({ type: [String] })
    async cities(): Promise<string[]> {
        return this.dictsService.getCities();
    }

    @Public()
    @Get('types')
    @ApiResponse({ type: [String] })
    async types(): Promise<string[]> {
        return this.dictsService.getTypes();
    }
}
