import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ApplicationStatus } from "./enums/applicationStatus.enum";

@Injectable()
export class ApplicationDao {
  constructor(private readonly db: PrismaService) {}

  async getApplicationByStudyFieldAndUser(studyFieldUuid: string, userId: string) {
    return this.db.application.findFirst({
      where: {
        studyField: {
          uuid: studyFieldUuid
        },
        user: {
          id: userId
        }
      }
    });
  }


  async createApplication(studyFieldUuid: string, userId: string) {
    return this.db.application.create({
      data: {
        status: ApplicationStatus.PENDING,
        studyField: {
          connect: {
            uuid: studyFieldUuid
          }
        },
        user: {
          connect: {
            id: userId
          }
        }
      }
    });
  }
}