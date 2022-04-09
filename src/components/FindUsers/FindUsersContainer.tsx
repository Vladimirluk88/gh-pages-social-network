import { useDispatch, useSelector } from "react-redux";
import {
    getUsersThunkCreator,
    follow,
    unfollow,
    resetFind,
    actions,
} from "../../redux/users-reducer";
import React, { useCallback, useEffect } from "react";
import { FindUsers } from "./FindUsers";
import { Preloader } from "../common/preloader";
import {
    getIsFetching,
    selectFilter,
} from "../../redux/selectors/users-selectors";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { useHistory } from "react-router-dom";
import { FriendFormType } from "./UsersSearchForm";

type OwnPropsType = {
    PageTitle?: string;
};

const FindUsersPage: React.FC<OwnPropsType> = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const filter = useSelector(selectFilter);
    let isFetching = useSelector(getIsFetching);

    const internalSetFilter = useCallback(
        (term: string | null, friend: FriendFormType = null) => {
            dispatch(actions.setFilter(term, boolFriend(friend)));
        },
        [dispatch]
    );

    const boolFriend = (friend: string | null) => {
        if (friend !== null) {
            if (friend === "null") {
                return null;
            } else return friend === "true";
        }
        if (friend === null || friend === undefined) return null;
    };

    const internalFollow = (userId: number) => {
        dispatch(follow(userId));
    };
    const internalUnfollow = (userId: number) => {
        dispatch(unfollow(userId));
    };
    const internalResetFind = () => {
        dispatch(resetFind());
    };

    useEffect(() => {
        dispatch(getUsersThunkCreator());
    }, [filter, dispatch]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const term: string | null = urlParams.get("term");
        let friend = urlParams.get("friend");
        if (term !== null || friend !== null) {
            // @ts-ignore
            internalSetFilter(term, friend);
        }
    }, [internalSetFilter]);

    useEffect(() => {
        if (filter.term !== "") {
            if (filter.friend === null) {
                history.push({
                    pathname: "/findUsers",
                    search: `term=${filter.term}`,
                });
            } else {
                history.push({
                    pathname: "/findUsers",
                    search: `term=${filter.term}&friend=${filter.friend}`,
                });
            }
        } else {
            history.push({
                pathname: "/findUsers",
                search: "",
            });
        }
    }, [filter, history]);

    return (
        <div>
            {isFetching ? <Preloader /> : null}
            <FindUsers
                follow={internalFollow}
                unfollow={internalUnfollow}
                resetFind={internalResetFind}
                setFilter={internalSetFilter}
            />
        </div>
    );
};

export default withAuthRedirect(FindUsersPage);
