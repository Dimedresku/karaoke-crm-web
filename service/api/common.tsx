import {AuthJWTService} from "../auth/authJWTService";
import {OpenAPI} from "../../openaip";
import {AuthService} from "../../openaip"

const getCredentials = () => {
    const auth = AuthJWTService()
    const token = auth.getToken()

    OpenAPI.TOKEN = token as string
    OpenAPI.WITH_CREDENTIALS = true
    OpenAPI.BASE = process.env.NEXT_PUBLIC_BACK_HOST as string
}

const refreshToken = async () => {
    const auth = AuthJWTService()
    const refreshToken = auth.getRefreshToken()
    if (refreshToken) {
        OpenAPI.TOKEN = refreshToken as string
        OpenAPI.WITH_CREDENTIALS = true
        OpenAPI.BASE = process.env.NEXT_PUBLIC_BACK_HOST as string

       try {
           const response = await AuthService.refreshTokenApiAuthRefreshPost()
           const newToken = response.access_token
           auth.setToken(newToken)
           return newToken
       } catch (e) {
            throw new Error(e as string)
       }
    }

}

export {getCredentials, refreshToken}
