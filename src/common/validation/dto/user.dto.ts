import { Transform, Type } from "class-transformer";
import { IsPhoneNumber, IsString, IsArray, IsNumber, ValidateNested, IsDate, IsOptional } from "class-validator";
import { Date } from "mongoose";
import { BaseDto, BaseGroupGroup } from "./base.dto";

export class UserDtoGroup extends BaseGroupGroup {
    static LOGIN = 'login';
    static USERNAME = 'username';
}


export class UserDto extends BaseDto {

    @IsString({ groups: [BaseGroupGroup.CREATE, BaseGroupGroup.PROFILE_UPDATE] })
    first_name!: string;

    @IsString({ groups: [BaseGroupGroup.CREATE, BaseGroupGroup.PROFILE_UPDATE] })
    last_name!: string;

    // @Transform(({ value }) => value?.toLowerCase().replace(/[^a-z_]/g, ''))
    @IsString({ groups: [BaseGroupGroup.CREATE, BaseGroupGroup.PROFILE_UPDATE, UserDtoGroup.LOGIN, UserDtoGroup.USERNAME] })
    username!: string;

}