import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { maxLength, requiredFiled } from '../../utils/validators/validators'
import { Input } from '../common/FormsControls';
import { login } from '../../redux/auth-reducer';
import styles from './Login.module.css'
import { Redirect } from 'react-router';
import { AppStateType } from '../../redux/redux-store';
import React from 'react';

const maxLength20 = maxLength(20);
const maxLength15 = maxLength(15);

type LoginFormOwnProps = {
    captchaUrl: string | null,
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div className="">
                <div className="">
                    <Field validate={[requiredFiled, maxLength20]}
                        component={Input} name={"email"} type="text" placeholder="login" />
                </div>
                <div className="">
                    <Field validate={[requiredFiled, maxLength20]}
                        component={Input} name={"password"} type="password" placeholder="password" />
                </div>
                <div className="">
                    <Field component={Input} name={"rememberMe"} type="checkbox" />
                    remember me
                </div>
                {props.captchaUrl && <img src={props.captchaUrl} alt=" "/>}
                {props.captchaUrl && <Field validate={[requiredFiled, maxLength15]}
                        component={Input} name={"captcha"} type="text" placeholder="captcha" />}
                {props.error && <div className={styles.form_summary_error}>
                    {props.error}
                </div>}
                <div className="">
                    <button>Login</button>
                </div>
            </div>
        </form>
    )
}


const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: 'login'
})(LoginForm)

type MapStatePropsType = {
    isAuth: boolean,
    captchaUrl: string | null
}
type MapDispatchType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
type PropsType = MapStatePropsType & MapDispatchType;

type LoginFormValuesType = {
    email: string, password: string, rememberMe: boolean, captcha: string
}

const Login: React.FC<PropsType> = (props) => {
    const OnSubmit = (formData: any) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }
    if (props.isAuth) {
        return <Redirect to="/profile" />;
    }
    return (
        <>
            <div className={styles.login_text}>
                <h1>Login</h1>
            </div>
            <LoginReduxForm onSubmit={OnSubmit} captchaUrl={props.captchaUrl} />
        </>
    )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
})

export default connect(mapStateToProps, { login })(Login);