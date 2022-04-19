import styles from "./Profile.module.css";
import { MyPostsContainer } from "./MyPost/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import React from "react";
import { ProfileType } from "../../types/types";

type OwnPropsType = {
    isOwner: boolean;
    status: string;
    updateStatus: (status: string) => void;
    savePhoto: (image: File) => void;
    profile: ProfileType | null;
    saveProfile: (formData: ProfileType) => void;
};

const ProfileComponent: React.FC<OwnPropsType> = (props) => {
    return (
        <div>
            <div className={styles.top_image}>
                <img
                    src="https://s3.tproger.ru/uploads/2016/10/reactmini.png"
                    alt=""
                ></img>
            </div>
            <div className={styles.main_content}>
                <ProfileInfo
                    isOwner={props.isOwner}
                    status={props.status}
                    updateStatus={props.updateStatus}
                    savePhoto={props.savePhoto}
                    profile={props.profile}
                    image="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                    description="user descr"
                    saveProfile={props.saveProfile}
                />
                <MyPostsContainer />
            </div>
        </div>
    );
};

export default ProfileComponent;
