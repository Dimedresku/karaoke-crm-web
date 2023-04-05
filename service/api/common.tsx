import {AuthJWTService} from "../auth/authJWTService";
import {OpenAPI} from "../../openaip";

const getCredentials = () => {
    const auth = AuthJWTService()
    const token = auth.getToken()

    OpenAPI.TOKEN = token as string
    OpenAPI.WITH_CREDENTIALS = true
    OpenAPI.BASE = process.env.NEXT_PUBLIC_BACK_HOST as string
}

export {getCredentials}
