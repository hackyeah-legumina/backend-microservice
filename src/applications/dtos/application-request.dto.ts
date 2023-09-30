import { IsPositive, IsUUID } from "class-validator";

export class ApplicationApplyDto {
  @IsUUID()
  studyFieldUuid: string;

  @IsPositive()
  calculatedScore: number;
}