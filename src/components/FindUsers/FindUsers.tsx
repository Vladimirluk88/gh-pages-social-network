import React, { useEffect, useState } from "react";
import styles from "./FindUsers.module.css";
import User from "./Users/User";
import { FriendFormType, UserSearchForm } from "./UsersSearchForm";
import { useSelector } from "react-redux";
import {
    getIsFollowingInProgress,
    getUsersArraySuper,
} from "../../redux/selectors/users-selectors";
import { AppStateType } from "../../redux/redux-store";

type MapDispatchPropsType = {
    follow: (userId: number) => void;
    unfollow: (userId: number) => void;
    setFilter: (term: string, friend: FriendFormType) => void;
    showMoreUsers: () => void;
};

let FindUsers: React.FC<{} & MapDispatchPropsType> = ({
    follow,
    unfollow,
    setFilter,
    showMoreUsers,
}) => {
    const usersArray = useSelector(getUsersArraySuper);
    const isFollowingInProgress = useSelector(getIsFollowingInProgress);
    const countPages = useSelector(
        (state: AppStateType) => state.UserPageData.countPageMayRecieved
    );
    const [recalculatePosition, setrecalculatePosition] = useState(false);
    const scrollHandle = () => {
        setrecalculatePosition(true);
    };
    useEffect(() => {
        setrecalculatePosition(false);
    }, [recalculatePosition]);
    return (
        <div onScroll={scrollHandle} className={styles.find_users_wrapper}>
            <UserSearchForm setFilter={setFilter} />
            <div className={styles.find_users_items}>
                <div className={styles.find_users_item}>
                    {usersArray.map((e) => {
                        return (
                            <User
                                recalculatePosition={recalculatePosition}
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
            {countPages !== 1 ? (
                <div className={styles.find_users_show_more}>
                    <button onClick={showMoreUsers}>Show more</button>
                </div>
            ) : null}
        </div>
    );
};

export { FindUsers };
