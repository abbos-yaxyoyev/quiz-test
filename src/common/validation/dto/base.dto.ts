import { IsString, IsMongoId } from "class-validator";

export class BaseGroupGroup {
    static CREATE = 'create'
    static UPDATE = 'update'
    static PROFILE_UPDATE = 'profile-update'
    static DELETE = 'delete'
    static GET = 'get'
    static GETById = 'getById'
    static PHONE = "phone"
    static USER_ANSWER_ID = 'amswer_question'
}

export class BaseDto {
    // @IsMongoId({ groups: [BaseGroupGroup.UPDATE, BaseGroupGroup.GETById, BaseGroupGroup.USER_ANSWER_ID] })
    @IsString({ groups: [BaseGroupGroup.UPDATE, BaseGroupGroup.GETById] })
    _id: string;
}