import {UsersService, OpenAPI, CreateUser, UpdateUser} from "../../openaip";
import {AuthJWTService} from "../auth/authJWTService";

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

const createUser = async (body: CreateUser) => {
    const auth = AuthJWTService()
    const token = auth.getToken()

    OpenAPI.TOKEN = token as string
    OpenAPI.WITH_CREDENTIALS = true

    try {
        await UsersService.createUserApiUsersPost(body)
    } catch (e) {
        throw new Error(e)
    }
}

const updateUser = async (user_id: number, body: UpdateUser) => {
    const auth = AuthJWTService()
    const token = auth.getToken()

    OpenAPI.TOKEN = token as string
    OpenAPI.WITH_CREDENTIALS = true

    try {
        await UsersService.updateUserApiUsersUserIdPatch(user_id, body)
    } catch (e) {
        throw new Error(e)
    }
}


export {
    getUsers,
    createUser,
    updateUser
}
