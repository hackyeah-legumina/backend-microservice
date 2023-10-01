import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ApplicationStatus } from "./enums/applicationStatus.enum";

@Injectable()
export class ApplicationDao {
  constructor(private readonly db: PrismaService) {}

  async getApplicationByStudyFieldAndUser(studyFieldUuid: string, userId: string) {
    return this.db.application.findFirst({
      where: {
        studiesField: {
          id: studyFieldUuid
        },
        user: {
          id: userId
        }
      }
    });
  }


  async createApplication(studyFieldUuid: string, calculatedScore: number, userId: string) {
    return this.db.application.create({
      data: {
        calculatedScore,
        status: ApplicationStatus.PENDING,
        studiesField: {
          connect: {
            id: studyFieldUuid
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

  async listUserApplications(userId: string) {
    return await this.db.application.findMany({
      where: {
        user: {
          id: userId
        }
      },
    });
  }

  async getApplicationById(id: string, userId: string) {
    return await this.db.application.findFirst({
      where: {
        id,
        user: {
          id: userId
        }
      },
      include: {
        studiesField: {
          include: {
            university: true
          }
        }
      }
    })
  }
}