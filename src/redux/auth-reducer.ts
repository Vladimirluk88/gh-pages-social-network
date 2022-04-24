import { InferActionsTypes, ThunkType } from "./redux-store";
import { FormAction, stopSubmit } from "redux-form";
import {
    authAPI,
    ResultCodesEnum,
    ResultCodesForCaptcha,
} from "../api/auth-api";
import { securityApi } from "../api/security-api";

let initialState: initialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
};

let getAuthUserData = (): AuthThunkType => async (dispatch) => {
    let data = await authAPI.authMe();
    if (data.resultCode === ResultCodesEnum.Success) {
        let { email, login, id }: { email: string; login: string; id: number } =
            data.data;
        dispatch(actions.setUserData(email, login, id, true));
    }
};

let login =
    (
        email: string,
        password: string,
        rememberMe: boolean,
        captcha: any
    ): AuthThunkType =>
    async (dispatch) => {
        console.log(dispatch);
        let response = await authAPI.login(
            email,
            password,
            rememberMe,
            captcha
        );
        if (response.resultCode === ResultCodesEnum.Success) {
            dispatch(getAuthUserData());
        } else {
            if (
                response.resultCode === ResultCodesForCaptcha.CaptchaIsRequired
            ) {
                dispatch(getCaptchaUrl());
            }
            let message =
                response.messages.length > 0
                    ? response.messages[0]
                    : "Some error";
            dispatch(stopSubmit("login", { _error: message }));
        }
    };

let logout = (): AuthThunkType => async (dispatch) => {
    let data = await authAPI.logout();
    console.log(dispatch);
    if (data.resultCode === 0) {
        dispatch(actions.setUserData(null, null, null, false));
    }
};

let getCaptchaUrl = (): AuthThunkType => async (dispatch) => {
    let data = await securityApi.getCaptchaUrl();
    const captchaUrl = data.data.url;
    dispatch(actions.setCaptchaUrl(captchaUrl));
};

let authReducer = (
    state = initialState,
    action: ActionsTypes
): initialStateType => {
    switch (action.type) {
        case "auth/SET-USER-DATA":
            return {
                ...state,
                ...action.payload,
            };
        case "SET-CAPTCHA-URL":
            return {
                ...state,
                captchaUrl: action.captchaUrl,
            };
        default:
            return state;
    }
};

export const actions = {
    setUserData: (
        email: null | string,
        login: string | null,
        userId: number | null,
        isAuth: boolean
    ) =>
        ({
            type: "auth/SET-USER-DATA",
            payload: { email, login, userId, isAuth },
        } as const),
    setCaptchaUrl: (captchaUrl: string) =>
        ({
            type: "SET-CAPTCHA-URL",
            captchaUrl: captchaUrl,
        } as const),
};

export { authReducer, getAuthUserData, login, logout, getCaptchaUrl };

type initialStateType = {
    userId: number | null;
    email: string | null;
    login: string | null;
    isAuth: boolean;
    captchaUrl: string | null;
};
type ActionsTypes = InferActionsTypes<typeof actions>;
type AuthThunkType = ThunkType<ActionsTypes | FormAction>;
