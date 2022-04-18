import { NavLink } from "react-router-dom";
import { PhotosType } from "../../../types/types";
import styles from "./User.module.css";

type OwnPropsType = {
    id: number;
    UserImage: PhotosType;
    UserDescription: string;
    followed: boolean;
    isFollowingInProgress: Array<number>;
    follow: (id: number) => void;
    unfollow: (id: number) => void;
};

const User: React.FC<OwnPropsType> = (props) => {
    return (
        <div className={styles.find_users_user}>
            <NavLink to={"/profile/" + props.id}>
                <div className={styles.find_users_link_wrapper}>
                <div className={styles.find_users_user_image}>
                    <img
                        src={
                            props.UserImage.large || props.UserImage.small || "http://assets.stickpng.com/thumbs/585e4beacb11b227491c3399.png"
                        }
                        alt=""
                    />
                </div>
                <div className={styles.find_users_user_info}>
                    {props.UserDescription}
                </div>
                </div>
            </NavLink>
            <div className={styles.find_users_user_buttons}>
                {props.followed ? (
                    <button
                        disabled={props.isFollowingInProgress.some(
                            (id) => id === props.id
                        )}
                        className={styles.find_users_btn_add_remove}
                        onClick={() => {
                            props.unfollow(props.id);
                        }}
                    >
                        Remove from list
                    </button>
                ) : (
                    <button
                        disabled={props.isFollowingInProgress.some(
                            (id) => id === props.id
                        )}
                        className={styles.find_users_btn_add_remove}
                        onClick={() => {
                            props.follow(props.id);
                        }}
                    >
                        Add to list
                    </button>
                )}
            </div>
        </div>
    );
};

export default User;

/*
 UserImage={e.photos.large || e.photos.small} UserDescription={e.name} key={e.id} id={e.id} followed={e.followed} isFollowingInProgress={isFollowingInProgress} follow={follow} unfollow={unfollow}
*/
