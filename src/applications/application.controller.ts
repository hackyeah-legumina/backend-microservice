import { Body, Controller, Get, Param, Post, UnauthorizedException } from "@nestjs/common";
import { ApplicationService } from "./application.service";
import { JwtPayload } from '../auth/auth.interfaces';
import { CtxUser } from "src/auth/decorators/ctx-user.decorator";
import { ApplicationApplyDto, ApplicationChangeStatusDto } from "./dtos/application-request.dto";

@Controller('application')
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

  @Get('/:id')
  async getApplicationById(@Param('id') id: string, @CtxUser() user: JwtPayload) {
      return await this.service.getApplicationById(id, user.id);
  }

  @Post(':id/change-status')
  async changeApplicationStatus(@Param('id') id: string, @Body() body: ApplicationChangeStatusDto ) {
    if (body.secretKey !== process.env.STATUS_SECRET_KEY) {
      throw new UnauthorizedException();
    }

    return await this.service.changeApplicationStatus(id, body.status);
  }
}