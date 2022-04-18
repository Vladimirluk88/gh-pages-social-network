import { ChangeEvent, useState } from "react";
import { ProfileType } from "../../../types/types";
import { Preloader } from "../../common/preloader";
import ProfileDataEdit from "./ProfileDataFormEdit";
import styles from "./ProfileInfo.module.css";
import ProfileStatusWithHoods from "./ProfileStatusWithHooks";

type OwnPropsType = {
    isOwner: boolean,
    status: string,
    updateStatus: (status: string) => void,
    savePhoto: (image: File) => void,
    profile: ProfileType | null,
    saveProfile: (formData: ProfileType) => void,
    image: string,
    description: string
}

const ProfileInfo: React.FC<OwnPropsType> = (props) => {
    let [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader />
    }
    const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            props.savePhoto(e.target.files[0]);
        }
    }
    const onSubmit = (formData: ProfileType) => {
        props.saveProfile(formData);
        setEditMode(false);
    }
    return (
        <div className={styles.info_about_user}>
             <div className={styles.avatar_name_user}>
             <div className={styles.user_avatar}>
             <img src={props.profile.photos.large || props.profile.photos.small || "http://assets.stickpng.com/thumbs/585e4beacb11b227491c3399.png"} alt="" className={styles.info_about_user__avatar} />
            {props.isOwner ? <input type="file" onChange={mainPhotoSelected}></input> : <></>}
             </div>
            <div className={styles.info_about_user__text}>
                {props.profile.fullName}
            </div>
             </div>
            {editMode ? <ProfileDataEdit status={props.status} updateStatus={props.updateStatus} onSubmit={onSubmit} /> : <ProfileInfoData {...props} toEditMode={()=> {setEditMode(true)}} />}
        </div>
    )
}

type ProfileInfoDataPropsType = {
    isOwner: boolean,
    status: string,
    updateStatus: (status: string) => void,
    profile: ProfileType | null,
    toEditMode: () => void
}

const ProfileInfoData: React.FC<ProfileInfoDataPropsType> = ({status, updateStatus, profile, isOwner, toEditMode}) => {
    return(
        <>
        {isOwner ? <div><button onClick={toEditMode}>Edit mode</button></div>: <></>}
        <div className={styles.user_status}>
                <span className={styles.user_status_text}><b>Status:</b></span>
                <ProfileStatusWithHoods status={status} updateStatus={updateStatus} />
            </div>
            <div className={styles.user_looking_for_a_job}>
                <b>Looking for a job:</b> {profile?.lookingForAJob ? "yes" : "no"}
            </div>
            <div className={styles.user_looking_for_a_job}>
                <b>About me:</b> {profile?.aboutMe}
            </div>
            </>
    )
}

export default ProfileInfo;