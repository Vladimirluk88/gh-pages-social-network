import React from "react";
import styles from "./FindUsers.module.css";
import User from "./Users/User";
import { FriendFormType, UserSearchForm } from "./UsersSearchForm";
import { useSelector } from "react-redux";
import {getIsFollowingInProgress,
    getUsersArraySuper,
} from "../../redux/selectors/users-selectors";

type MapDispatchPropsType = {
    follow: (userId: number) => void;
    unfollow: (userId: number) => void;
    resetFind: () => void;
    setFilter: (term: string, friend: FriendFormType) => void
};

let FindUsers: React.FC<{} & MapDispatchPropsType> = ({
    follow,
    unfollow,
    resetFind,
    setFilter
}) => {
    const usersArray = useSelector(getUsersArraySuper);
    const isFollowingInProgress = useSelector(getIsFollowingInProgress);
    return (
        <div className={styles.find_users_wrapper}>
            <UserSearchForm resetFind={resetFind} setFilter={setFilter} />
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
