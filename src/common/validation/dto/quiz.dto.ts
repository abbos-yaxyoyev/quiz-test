import { Transform, Type } from "class-transformer";
import { IsString, IsNumber, ValidateNested, IsDate, IsOptional } from "class-validator";
import { Date } from "mongoose";
import { BaseDto, BaseGroupGroup } from "./base.dto";

export class QuizDtoGroup extends BaseGroupGroup {

}


export class QuizDto extends BaseDto {

    @IsString({ groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE] })
    public user_id: string;

    @IsNumber({
        allowInfinity: false,
        allowNaN: false
    }, { groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE] })
    public total_count !: number;

    @IsNumber({
        allowInfinity: false,
        allowNaN: false
    }, { groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE] })
    @IsOptional({ groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE] })
    public correct_count?: number;

    @IsNumber({
        allowInfinity: false,
        allowNaN: false
    }, { groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE] })
    @IsOptional({ groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE] })
    public incorrect_count?: number;

    @IsNumber({
        allowInfinity: false,
        allowNaN: false
    }, { groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE] })
    @IsOptional({ groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE] })
    public result?: number;

    @IsOptional({ groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE] })
    @IsDate({ groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE] })
    public started_at?: any;

    @IsOptional({ groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE] })
    @IsDate({ groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE] })
    public finished_at?: any;

    @IsString({ groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE] })
    status?: string;

    @IsOptional({ groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE] })
    @IsString({ groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE] })
    public percent?: string;


}