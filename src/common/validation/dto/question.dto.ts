import { Type, Transform } from "class-transformer";
import { IsString, IsArray, ValidateNested, IsOptional, IsObject, IsBoolean, IsMongoId } from "class-validator";
import { Types } from "mongoose";
import { BaseDto, BaseGroupGroup } from "./base.dto";

export class QuestionDtoGroup extends BaseGroupGroup {

}

export class Answer {

    @IsString({ groups: [QuestionDtoGroup.CREATE, QuestionDtoGroup.UPDATE] })
    title: string;

    @IsBoolean({ groups: [QuestionDtoGroup.CREATE, QuestionDtoGroup.UPDATE] })
    isCorrect: boolean;
}

export class QuestionDto extends BaseDto {
    @IsString({ groups: [QuestionDtoGroup.CREATE, QuestionDtoGroup.UPDATE] })
    title!: string;

    @IsString({ groups: [QuestionDtoGroup.CREATE, QuestionDtoGroup.UPDATE] })
    type!: string;

    @Type(() => Answer)
    @ValidateNested({ each: true, groups: [QuestionDtoGroup.CREATE, QuestionDtoGroup.UPDATE] })
    @IsArray({ groups: [QuestionDtoGroup.CREATE, QuestionDtoGroup.UPDATE] })
    alternativ: Answer[];
}