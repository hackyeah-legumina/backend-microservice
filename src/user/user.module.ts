import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDao } from './user.dao';
import { UserController } from './user.controller';

@Module({
    controllers: [UserController],
    providers: [UserService, UserDao],
    exports: [UserService],
})
export class UserModule {}
