import {
    AuthService,
    OpenAPI,
    Body_login_api_auth_login_post,
} from "../../openaip"


export const AuthJWTService = () => {

    OpenAPI.BASE = "http://localhost:3000"
    OpenAPI.WITH_CREDENTIALS = true

    const login = async (credentials: Body_login_api_auth_login_post) => {
        try {
            const response = await AuthService.loginApiAuthLoginPost(credentials)
            if (response.status == 'success') {
                const accessToken = response.access_token
                setToken(accessToken)
                return accessToken
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

    const isAuthUser = async (token: string) => {
        if (!token) {
            return false
        }

        const username = await checkAuthorization(token)
        return !!username;
    }

    const setToken = (token: string) => {
        localStorage.setItem('access_token', token)
    }

    const getToken = () => {
        return localStorage.getItem('access_token')
    }

    return {
        login,
        logout,
        isAuthUser,
        getToken
    }
}
