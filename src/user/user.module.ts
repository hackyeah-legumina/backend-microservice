import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDao } from "./user.dao";

@Module({
  providers: [UserService, UserDao],
  exports: [UserService],
})
export class UserModule {}