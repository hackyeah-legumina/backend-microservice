import { BadRequestException, Injectable } from "@nestjs/common";
import { ApplicationDao } from "./application.dao";
import { ApplicationStatus } from "./enums/applicationStatus.enum";

@Injectable()
export class ApplicationService {
  constructor(private readonly dao: ApplicationDao) {}

  async validateIfAlreadyApplied(studyFieldUuid: string, userId: string) {
    return !! await this.dao.getApplicationByStudyFieldAndUser(studyFieldUuid, userId);    
  }

  async applyForStudyField(studyFieldUuid: string, calculatedScore: number, userId: string) {
    const alreadyApplied = await this.validateIfAlreadyApplied(studyFieldUuid, userId);

    if (alreadyApplied) {
      throw new BadRequestException('Already applied');
    }

    return await this.dao.createApplication(studyFieldUuid, calculatedScore, userId);
  }

  async listUserApplications(userId: string) {
    return await this.dao.listUserApplications(userId)
  }

  async getApplicationById(id: string, userId: string) {
    return await this.dao.getApplicationById(id, userId);
  }

  async changeApplicationStatus(id: string, status: ApplicationStatus) {
    // here should be notification to user about status change
    return await this.dao.changeApplicationStatus(id, status);
  }
}
