import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthLoginDto, AuthRefreshDto, AuthRegisterDto } from "./models/auth.input";
import { Public } from "src/common/decorators/public.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Public()
  @Post("login")
  @HttpCode(200)
  login(@Body() user: AuthLoginDto) {
    return this.service.login(user);
  }
  
  @Public()
  @Post("register")
  @HttpCode(201)
  register(@Body() user: AuthRegisterDto) {
    return this.service.register(user);
  }

  @Public()
  @Post("refresh")
  @HttpCode(200)
  refresh(@Body() { refreshToken }: AuthRefreshDto) {
    return this.service.refresh(refreshToken);
  }
}