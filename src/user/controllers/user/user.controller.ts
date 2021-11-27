import { UserDtoGroup, UserDto } from "../../../common/validation/dto/user.dto";
import { validateIt } from "../../../common/validation/validator";
import md5 from 'md5'
import { jwtSign } from "../../../common/middleware/authorization";
import { UserErrors } from "../../../common/db/models/user/user.errors";
import {
    createUserService,
    getUserByIdService,
    getUserByUsernameService,
    userCaunttotalService,
    userUpdateService
} from "../../services/user.service";



export async function userRegisterController(request, reply) {
    try {
        const data = await validateIt(request.body, UserDto, [UserDtoGroup.CREATE])
        let user: any = await createUserService(data)
        const jwtParams = {
            username: user.username
        }
        const token = jwtSign(request, jwtParams)
        console.log("token :", token);
        console.log("jwtParams :", jwtParams);
        return reply.success({ token });
    } catch (error) {
        throw UserErrors.UnknownError(error)
    }
}

export async function userUpdateByQueryController(request, reply) {
    const { username } = request.user
    const data = await validateIt(request.body, UserDto, [UserDtoGroup.PROFILE_UPDATE])
    console.log('userUpdateService :', data);
    const userdata = await userUpdateService(username, data)
    return reply.success(userdata);
}

export async function getUserByIdController(request, reply) {
    const data = await validateIt(request.params, UserDto, [UserDtoGroup.GETById])
    console.log("data :", data);
    const user = await getUserByIdService(data._id)
    return reply.success(user);
}

export async function getUserByUsernameController(request, reply) {
    const data = await validateIt(request.body, UserDto, [UserDtoGroup.USERNAME])
    console.log('userUpdateByIdController :', data);
    const user = await getUserByUsernameService(data.username)
    return reply.success(user);
}

export async function userCaunttotalController(request, reply) {
    const userdata = await userCaunttotalService()
    return reply.success(userdata);
}