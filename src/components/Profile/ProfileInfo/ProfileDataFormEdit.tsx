import { Input } from "../../common/FormsControls";
import styles from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { requiredFiled } from '../../../utils/validators/validators';
import { ProfileType } from "../../../types/types";
import React from "react";

type OwnPropsType = {
    status: string,
    updateStatus: (newStatus: string) => void
}

const ProfileInfoDataForm: React.FC<InjectedFormProps<ProfileType, OwnPropsType> & OwnPropsType> = ({status, updateStatus, handleSubmit}) => {
    return(
        <form onSubmit={handleSubmit}>
            <div><button>Save</button></div>
        <div className={styles.user_status}>
                <span className={styles.user_status_text}><b>Status:</b></span>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
            </div>
            <div className={styles.user_looking_for_a_job}>
                <b>Looking for a job:</b> <Field component={Input} name="lookingForAJob" placeholder="Looking for a job" type="checkbox" />
                 {/* {profile.lookingForAJob ? "yes" : "no"} */}
            </div>
            <div className={styles.user_looking_for_a_job}>
                <b>Looking for a job description:</b> <Field validate={[requiredFiled]} component={Input} name="lookingForAJobDescription" placeholder="Looking for a job description" />
            </div>
            <div className={styles.user_looking_for_a_job}>
                <b>Full name:</b> <Field component={Input}  name="fullName" placeholder="Full name" />
            </div>
            <div className={styles.user_looking_for_a_job}>
                <b>About me:</b> <Field component={Input}  name="aboutMe" placeholder="About me" />
            </div>
            </form>
    )
}
let ProfileDataEdit = reduxForm<ProfileType, OwnPropsType>({ form: "EditProfile" })(ProfileInfoDataForm);
export default ProfileDataEdit;