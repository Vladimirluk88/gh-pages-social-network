import React from "react";
import styles from "./FindUsers.module.css";
import User from "./Users/User";
import { UserSearchForm } from "./UsersSearchForm";
// eslint-disable-next-line
import { useSelector } from "react-redux";
// eslint-disable-next-line
import {
    getIsFetching,
    getIsFollowingInProgress,
    getUsersArraySuper,
} from "../../redux/users-selectors";

type MapStatePropsType = { };

type MapDispatchPropsType = {
    follow: (userId: number) => void;
    unfollow: (userId: number) => void;
    findUser: (term: string, friend: null | "true" | "false" | "null") => void;
    resetFind: () => void;
};

let FindUsers: React.FC<MapStatePropsType & MapDispatchPropsType> = ({
    follow,
    unfollow,
    findUser,
    resetFind,
}) => {
    // eslint-disable-next-line
    const usersArray = useSelector(getUsersArraySuper);
    const isFollowingInProgress = useSelector(getIsFollowingInProgress);
    return (
        <div className={styles.find_users_wrapper}>
            <UserSearchForm findUser={findUser} resetFind={resetFind} />
            <div className={styles.find_users_items}>
                <div className={styles.find_users_item}>
                    {usersArray.map((e) => {
                        return (
                            <User
                                UserImage={e.photos}
                                UserDescription={e.name}
                                key={e.id}
                                id={e.id}
                                followed={e.followed}
                                isFollowingInProgress={isFollowingInProgress}
                                follow={follow}
                                unfollow={unfollow}
                            />
                        );
                    })}
                </div>
            </div>
           {/*
            <div className={styles.find_users_show_more}>
                <button onClick={showMore}>Show more</button>
            </div>
           */}
        </div>
    );
};

export { FindUsers };
