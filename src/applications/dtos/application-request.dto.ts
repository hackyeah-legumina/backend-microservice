import { IsUUID } from "class-validator";

export class ApplicationApplyDto {
  @IsUUID()
  studyFieldUuid: string;
}