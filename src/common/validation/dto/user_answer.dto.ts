import { Type, Transform } from "class-transformer";
import { IsString, IsObject, IsOptional, IsMongoId, IsArray } from "class-validator";
import { Types } from "mongoose";
import { BaseDto, BaseGroupGroup } from "./base.dto";
import { Answer } from "./question.dto";

export class AnswerDtoGroup extends BaseGroupGroup {
    static QUIZ_ID = 'quiz';
}


export class AnswerDto extends BaseDto {

    @IsMongoId({
        groups: [AnswerDtoGroup.QUIZ_ID, AnswerDtoGroup.USER_ANSWER_ID]
    })
    public question_id!: string;

    @IsMongoId({
        groups: [AnswerDtoGroup.QUIZ_ID, AnswerDtoGroup.USER_ANSWER_ID]
    })
    public quiz_id!: string;

    @IsOptional({ groups: [AnswerDtoGroup.USER_ANSWER_ID] })
    @Transform(({ value }) => {
        value.forEach((item, index, array) => {
            array[index] = Types.ObjectId(item);
        });
        return value;
    })
    @IsArray({ groups: [AnswerDtoGroup.USER_ANSWER_ID] })
    public user_answer_id: Types.ObjectId[];

}