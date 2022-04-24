import { useDispatch, useSelector } from "react-redux";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { maxLength, requiredFiled } from "../../utils/validators/validators";
import { Input } from "../common/FormsControls";
import { login } from "../../redux/auth-reducer";
import styles from "./Login.module.css";
import { Redirect } from "react-router";
import React, { useCallback } from "react";
import {
    selectCaptchaUrl,
    selectIsAuth,
} from "../../redux/selectors/auth-selectors";

const maxLength25 = maxLength(25);
const maxLength15 = maxLength(15);

type LoginFormOwnProps = {
    captchaUrl: string | null;
};
type LoginFormValuesType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha: string;
};
const LoginForm: React.FC<
    InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> &
        LoginFormOwnProps
> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="">
                <div className="">
                    <Field
                        validate={[requiredFiled, maxLength25]}
                        component={Input}
                        name={"email"}
                        type="text"
                        placeholder="login"
                    />
                </div>
                <div className="">
                    <Field
                        validate={[requiredFiled, maxLength25]}
                        component={Input}
                        name={"password"}
                        type="password"
                        placeholder="password"
                    />
                </div>
                <div className="">
                    <Field
                        component={Input}
                        name={"rememberMe"}
                        type="checkbox"
                    />
                    remember me
                </div>
                {props.captchaUrl && <img src={props.captchaUrl} alt=" " />}
                {props.captchaUrl && (
                    <Field
                        validate={[requiredFiled, maxLength15]}
                        component={Input}
                        name={"captcha"}
                        type="text"
                        placeholder="captcha"
                    />
                )}
                {props.error && (
                    <div className={styles.form_summary_error}>
                        {props.error}
                    </div>
                )}
                <div className="">
                    <button>Login</button>
                </div>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: "login",
})(LoginForm);

const Login: React.FC = (props) => {
    const isAuth = useSelector(selectIsAuth);
    const captchaUrl = useSelector(selectCaptchaUrl);

    const dispatch = useDispatch();
    const internalLogin = useCallback(
        (
            email: string,
            password: string,
            rememberMe: boolean,
            captcha: any
        ) => {
            dispatch(login(email, password, rememberMe, captcha));
        },
        [dispatch]
    );
    const OnSubmit = (formData: any) => {
        internalLogin(
            formData.email,
            formData.password,
            formData.rememberMe,
            formData.captcha
        );
    };
    if (isAuth) {
        return <Redirect to="/profile" />;
    }
    return (
        <>
            <div className={styles.login_text}>
                <h1>Login</h1>
            </div>
            <div>Для просмотра внутреннего функционала
                <div>Логин: cehole2879@richdn.com</div>
                <div>Пароль: s04jdai8182dsakd</div>
            </div>
            <LoginReduxForm onSubmit={OnSubmit} captchaUrl={captchaUrl} />
        </>
    );
};

export default Login;
