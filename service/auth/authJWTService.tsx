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
                const refreshToken = response.refresh_token
                setToken(accessToken)
                setRefreshToken(refreshToken)
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

    const getAuthToken = async (cookies: any) => {
        let token = cookies.get("access_token")
        const refreshToken = cookies.get("refresh_token")

        if (!token && refreshToken) {
            OpenAPI.TOKEN = refreshToken
            const response = await AuthService.refreshTokenApiAuthRefreshPost()
            token = response.access_token
        }

        const username = await checkAuthorization(token)
        if (!username) {
            return null
        } else {
            return token
        }
    }

    const setToken = (token: string) => {
        localStorage.setItem('access_token', token)
    }

    const setRefreshToken = (refreshToken: string) => {
        localStorage.setItem('refresh_token', refreshToken)
    }

    const getToken = () => {
        return localStorage.getItem('access_token')
    }

    const getRefreshToken = () => {
        return localStorage.getItem('refresh_token')
    }

    return {
        login,
        logout,
        getAuthToken,
        getToken,
        getUser,
        getRefreshToken,
        setToken
    }
}
