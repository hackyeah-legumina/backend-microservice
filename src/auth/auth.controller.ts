import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
    AuthLoginDto,
    AuthRefreshDto,
    AuthRegisterDto,
} from './models/auth.input';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiResponse } from '@nestjs/swagger';
import { AuthResponseDto } from './models/auth-response.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) {}

    @Public()
    @Post('login')
    @HttpCode(200)
    @ApiResponse({ type: AuthResponseDto })
    login(@Body() user: AuthLoginDto): Promise<AuthResponseDto> {
        return this.service.login(user);
    }

    @Public()
    @Post('register')
    @HttpCode(201)
    @ApiResponse({ type: AuthRegisterDto })
    register(@Body() user: AuthRegisterDto): Promise<AuthRegisterDto> {
        return this.service.register(user);
    }

    @Public()
    @Post('refresh')
    @HttpCode(200)
    @ApiResponse({ type: AuthResponseDto })
    refresh(@Body() { refreshToken }: AuthRefreshDto): AuthResponseDto {
        return this.service.refresh(refreshToken);
    }
}
