import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CtxUser } from '../auth/decorators/ctx-user.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { JwtPayload } from '../auth/auth.interfaces';
import { UserService } from './user.service';
import { UserDto } from './dtos/user.dto';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Public()
    @Get('me')
    @HttpCode(200)
    @ApiResponse({ type: UserDto })
    async me(@CtxUser() user: JwtPayload): Promise<UserDto> {
        if (!user) return null;

        const dbUser = await this.userService.findById(user.id);
        return {
            id: dbUser.id,
            username: dbUser.username,
            email: dbUser.email,
            name: dbUser.name,
        };
    }
}
