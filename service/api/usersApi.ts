import {UsersService, CreateUser, UpdateUser} from "../../openaip";
import {getCredentials} from "./common";

type getUserProps = {
    limit: number,
    page: number
}

const getUsers = async ({limit, page}: getUserProps) => {
    getCredentials()

    try {
        const response = await UsersService.getAllUsersApiUsersGet(limit, page)
        return {result: response.users, count: response.result}
    } catch (e) {
        // @ts-ignore
        throw new Error(e)
    }
}


const updateUser = async (user_id: number, body: UpdateUser) => {
    getCredentials()

    try {
        await UsersService.updateUserApiUsersUserIdPatch(user_id, body)
    } catch (e) {
        // @ts-ignore
        throw new Error(e)
    }
}

const deleteUsers = async (userIds: Array<number>) => {
    getCredentials()

    try {
        await Promise.all(userIds.map(async (userId: number) => UsersService.deleteUserApiUsersUserIdDelete(userId)))
    } catch (e) {
        // @ts-ignore
        throw new Error(e)
    }
}


const uploadAvatar = async (user_id: number, file: File) => {
    getCredentials()

    try {
        await UsersService.uploadImageApiUsersUserIdUploadImagePost(user_id, {file: file})
    } catch (e) {
        // @ts-ignore
        throw new Error(e)
    }
}

type CreateUserData = {
    id: number | undefined,
    name: string | undefined,
    username: string,
    password: string |undefined,
    image: Blob | undefined,
    changeImage: boolean
}

const createUserOrUpdate = async (data: CreateUserData) => {
    getCredentials()

    try {
        if (data.id) {
            await UsersService.updateUserApiUsersUserIdPatch(data.id, data as CreateUser)
            if (data.changeImage && data.image) {
                await UsersService.uploadImageApiUsersUserIdUploadImagePost(data.id, {file: data.image})
            }
        } else {
            const response = await UsersService.createUserApiUsersPost(data as CreateUser)
            if (data.image) {
                await UsersService.uploadImageApiUsersUserIdUploadImagePost(response.user?.id, {file: data.image})
            }
        }
    } catch (e) {
        // @ts-ignore
        throw new Error(e)
    }

}

export {
    getUsers,
    createUserOrUpdate,
    updateUser,
    deleteUsers,
    uploadAvatar,
    getCredentials
}
