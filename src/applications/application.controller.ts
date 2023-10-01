import { Body, Controller, Get, Post, UnauthorizedException } from "@nestjs/common";
import { ApplicationService } from "./application.service";
import { JwtPayload } from '../auth/auth.interfaces';
import { CtxUser } from "src/auth/decorators/ctx-user.decorator";
import { ApplicationApplyDto } from "./dtos/application-request.dto";

@Controller('applications')
export class ApplicationController {
  constructor(private readonly service: ApplicationService) {}

  @Post('apply')
  async applyForStudyField(@Body() { studyFieldUuid, calculatedScore }: ApplicationApplyDto, @CtxUser() user: JwtPayload) {
    if (!user) {
      throw new UnauthorizedException();
    }
  
    return await this.service.applyForStudyField(studyFieldUuid, calculatedScore, user.id);
  }

  @Get('list')
  async listUserApplications(@CtxUser() user: JwtPayload) {
    return await this.service.listUserApplications(user.id)
  }
}