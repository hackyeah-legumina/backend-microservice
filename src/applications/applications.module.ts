import { Module } from "@nestjs/common";
import { ApplicationController } from "./application.controller";
import { ApplicationDao } from "./application.dao";
import { ApplicationService } from "./application.service";

@Module({
  controllers: [ApplicationController],
  providers: [ApplicationService, ApplicationDao]
})
export class ApplicationModule {}