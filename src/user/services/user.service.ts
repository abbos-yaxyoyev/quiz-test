import { UserErrors } from "../../common/db/models/user/user.errors";
import { User, UserModel } from "../../common/db/models/user/user.models";
import { findOne, create, findById, updateOne, countTotal } from "../../common/service/base.service";

export async function createUserService(data: any) {
    try {
        const user = await create(UserModel, data);
        return user;
    } catch (error) {
        throw UserErrors.AllreadyExists(error)
    }
}

export async function getUserByUsernameService(username: string) {
    const user = await findOne(UserModel, { username: username });
    if (!user) {
        throw UserErrors.NotFound(username)
    }
    return user;
}

export async function getUserByIdService(_id: string) {
    const user = await findById(UserModel, _id);
    if (!user) {
        throw UserErrors.NotFound({ user_id: _id })
    }
    return user;
}

export async function userUpdateService(username: string, data: any) {
    const user = await updateOne(UserModel, { username }, data);
    if (!user) {
        throw UserErrors.NotFound(data)
    }
    return user;
}

export async function userCaunttotalService() {
    const user = await countTotal(UserModel, {});
    if (!user) {
        throw UserErrors.NotFound(user)
    }
    return user;
}
