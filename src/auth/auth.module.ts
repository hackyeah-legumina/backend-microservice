import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AUTH_CONFIG_KEY, AUTH_CONFIG_TOKEN, AuthConfig } from "src/configs/auth.config";


@Module({
  controllers: [AuthController],
  imports: [
    UserModule, 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.getOrThrow<AuthConfig>(AUTH_CONFIG_TOKEN).secret,
      })
    })
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}