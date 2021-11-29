import { Transform, Type } from "class-transformer";
import { IsString, IsNumber, ValidateNested, IsDate, IsOptional } from "class-validator";
import { Date } from "mongoose";
import { BaseDto, BaseGroupGroup } from "./base.dto";

export class QuizDtoGroup extends BaseGroupGroup {

}


export class QuizDto extends BaseDto {

    @IsNumber({
        allowInfinity: false,
        allowNaN: false
    }, { groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE] })
    public total_count !: number;

}