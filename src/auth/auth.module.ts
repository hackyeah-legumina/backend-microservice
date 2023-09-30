import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";


@Module({
  controllers: [AuthController],
  imports: [
    UserModule, 
    JwtModule.register({
      global: true,
      secret: 'secretKey',
      signOptions: {
        expiresIn: '60s'
      }
    })
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}