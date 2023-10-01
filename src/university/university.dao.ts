import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UniversityDao {
  constructor(private readonly db: PrismaService) {}

  async findByIdWithStudyFields(id: string) {
    return await this.db.universities.findUnique({
      where: { id },
      include: {
        StudiesField: {
          include: {
            studiesFieldScoresHistory: true
          },
        },
      },
    });
  }
}
