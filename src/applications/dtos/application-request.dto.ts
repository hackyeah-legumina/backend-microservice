import { IsPositive, IsUUID } from "class-validator";
import { ApplicationStatus } from "../enums/applicationStatus.enum";

export class ApplicationApplyDto {
  @IsUUID()
  studyFieldUuid: string;

  @IsPositive()
  calculatedScore: number;
}

export class ApplicationChangeStatusDto {
  @IsUUID()
  studyFieldUuid: string;

  status: ApplicationStatus;

  secretKey: string;
}