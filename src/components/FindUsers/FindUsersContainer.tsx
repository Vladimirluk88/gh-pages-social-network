import {  useDispatch, useSelector } from 'react-redux';
import {  getUsersThunkCreator, follow, unfollow, findUser, resetFind, actions } from '../../redux/users-reducer';
import React, { useEffect } from 'react';
import { FindUsers } from './FindUsers';
import { Preloader } from '../common/preloader';
import { getIsFetching } from "../../redux/users-selectors";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { AppStateType } from '../../redux/redux-store';
import { useHistory } from "react-router-dom";

type OwnPropsType = {
    PageTitle?: string
}


const FindUsersPage: React.FC<OwnPropsType> = (props) => {
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getUsersThunkCreator());
    }, [dispatch]);

    const filter = useSelector((state: AppStateType) => state.UserPageData.filter);

    const history = useHistory();

    /*
    useEffect(() => {
        if(filter.term !== "") {
            if(filter.friend === null || filter.friend === "null") {
                history.push({
                    pathname: "/findUsers",
                    search: `term=${filter.term}`
                });
            } else {
                history.push({
                    pathname: "/findUsers",
                    search: `term=${filter.term}&friend=${filter.friend}`
                });
            }

        } else {
            history.push({
                pathname: "/findUsers",
                search: ""
            })
        }
    }, [filter, history]);
    */
    const internalSetFilter =(term: string, friend: null | "true" | "false" | "null" = null) => {
        dispatch(actions.setFilter(term, friend))
    }
   useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const term: string | null = urlParams.get("term");
    const friend = urlParams.get("friend");
    // @ts-ignore
    internalSetFilter(term, friend);
   }, [])
    const internalFollow = (userId: number) => {
        dispatch(follow(userId))
    }
    const internalUnfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }
    const internalFindUser = (term: string, friend: null | "true" | "false" | "null") => {
        dispatch(findUser(term, friend))
    }
    const internalResetFind = () => {
        dispatch(resetFind())
    }

    let isFetching = useSelector(getIsFetching);
    return (
        <div>
            {isFetching ? <Preloader /> : null}
            <FindUsers
                follow={internalFollow}
                unfollow={internalUnfollow}
                findUser={internalFindUser}
                resetFind={internalResetFind}
                setFilter={internalSetFilter} />
        </div>
    )
}

export default withAuthRedirect(FindUsersPage);