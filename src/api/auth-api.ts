import { instanse, ResponseType } from "./api";

type MeResponseDataType = {
    id: number;
    email: string;
    login: string;
};

type LoginResponseType = {
    userId: number;
};

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodesForCaptcha {
    CaptchaIsRequired = 10,
}

export const authAPI = {
    authMe() {
        return instanse
            .get<ResponseType<MeResponseDataType, ResultCodesEnum>>("/auth/me")
            .then((response) => response.data);
    },
    login(
        email: string,
        password: string,
        rememberMe = false,
        captcha: null | string = null
    ) {
        return instanse
            .post<
                ResponseType<
                    LoginResponseType,
                    ResultCodesEnum | ResultCodesForCaptcha
                >
            >("auth/login", {
                email,
                password,
                rememberMe,
                captcha,
            })
            .then((response) => response.data);
    },
    logout() {
        return instanse.delete("auth/login").then((response) => response.data);
    },
};
