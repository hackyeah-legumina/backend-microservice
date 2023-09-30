import { BadRequestException, Injectable } from "@nestjs/common";
import { ApplicationDao } from "./application.dao";

@Injectable()
export class ApplicationService {
  constructor(private readonly dao: ApplicationDao) {}

  async validateIfAlreadyApplied(studyFieldUuid: string, userId: string) {
    return !!this.dao.getApplicationByStudyFieldAndUser(studyFieldUuid, userId);    
  }

  async applyForStudyField(studyFieldUuid: string, userId: string) {
    const alreadyApplied = await this.validateIfAlreadyApplied(studyFieldUuid, userId);

    if (alreadyApplied) {
      throw new BadRequestException('Already applied');
    }

    return this.dao.createApplication(studyFieldUuid, userId);
  }
}
