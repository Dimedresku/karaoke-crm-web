import {UsersService, OpenAPI, CreateUser, UpdateUser, UserResponse} from "../../openaip";
import {AuthJWTService} from "../auth/authJWTService";
import {constants} from "os";
import errno = module

const getUsers = async (token: string) => {
    OpenAPI.TOKEN = token
    OpenAPI.WITH_CREDENTIALS = true
    OpenAPI.BASE = "http://192.168.56.110:8080"

    try {
        const response = await UsersService.getAllUsersApiUsersGet()
        return response.users
    } catch (e) {
        throw new Error(e)
    }
}

const getCredentials = () => {
    const auth = AuthJWTService()
    const token = auth.getToken()

    OpenAPI.TOKEN = token as string
    OpenAPI.WITH_CREDENTIALS = true
    OpenAPI.BASE = "http://192.168.56.110:8080"
}

const createUser = async (body: CreateUser) => {
    getCredentials()

    try {
        const newUser = await UsersService.createUserApiUsersPost(body)
        return newUser
    } catch (e) {
        throw new Error(e)
    }
}

const updateUser = async (user_id: number, body: UpdateUser) => {
    getCredentials()

    try {
        await UsersService.updateUserApiUsersUserIdPatch(user_id, body)
    } catch (e) {
        throw new Error(e)
    }
}

const deleteUsers = async (user_ids: Array<number>) => {
    getCredentials()

    try {
        user_ids.map(async (user_id: number) => await UsersService.deleteUserApiUsersUserIdDelete(user_id))
    } catch (e) {
        throw new Error(e)
    }
}


const uploadAvatar = async (user_id: number, file: File) => {
    getCredentials()
    try {
        await UsersService.uploadImageApiUsersUserIdUploadImagePost(user_id, {file: file})
    } catch (e) {
        throw new Error(e)
    }
}

export {
    getUsers,
    createUser,
    updateUser,
    deleteUsers,
    uploadAvatar,
    getCredentials
}
