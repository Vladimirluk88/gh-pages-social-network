import { AppStateType } from "./../redux-store";

const selectIsAuth = (state: AppStateType) => state.auth.isAuth;
const selectCurrentUserLogin = (state: AppStateType) => state.auth.login;
const selectCaptchaUrl = (state: AppStateType) => state.auth.captchaUrl;
export { selectIsAuth, selectCurrentUserLogin, selectCaptchaUrl };
