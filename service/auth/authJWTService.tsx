import {
    AuthService,
    OpenAPI,
    Body_login_api_auth_login_post,
} from "../../openaip"
import Cookies from 'cookies'


export const AuthJWTService = () => {

    OpenAPI.BASE = "http://localhost:3000"
    OpenAPI.WITH_CREDENTIALS = true

    const login = async (credentials: Body_login_api_auth_login_post) => {
        try {
            const response = await AuthService.loginApiAuthLoginPost(credentials)
            if (response.status == 'success') {
                return response.access_token
            } else {
                throw new Error("Invalid credentials")
            }
        } catch (e) {
            throw new Error(e)
        }
    }

    const getUser = async (token: string) => {

        if (!token) {
            return false
        } else {
            OpenAPI.TOKEN = token
            try {
                const user = await AuthService.getUserApiAuthGetUserGet()
                return user
            } catch (e) {
                return false
            }
        }
    }

    const checkAuthorization = async (token: string) => {
        const authUser = await getUser(token)
        if (authUser != false) {
            return authUser.username
        } else {
            return null
        }
    }

    const logout = async () => {
        await AuthService.logoutApiAuthLogoutGet()
    }

    const isAuthUser = async (req: any, res: any) => {
        const cookies = new Cookies(req, res)
        const token = cookies.get("access_token")
        if (!token) {
            return false
        }

        const username = await checkAuthorization(token)
        return !!username;
    }

    return {
        login,
        logout,
        isAuthUser,
    }
}
