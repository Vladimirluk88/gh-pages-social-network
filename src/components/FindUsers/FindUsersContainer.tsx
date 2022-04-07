import {  useDispatch, useSelector } from 'react-redux';
import {  getUsersThunkCreator, follow, unfollow, findUser, resetFind } from '../../redux/users-reducer';
import React, { useEffect } from 'react';
import { FindUsers } from './FindUsers';
import { Preloader } from '../common/preloader';
import { getIsFetching } from "../../redux/users-selectors";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

type OwnPropsType = {
    PageTitle?: string
}


const FindUsersPage: React.FC<OwnPropsType> = (props) => {
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getUsersThunkCreator());
    }, [dispatch]);

    let isFetching = useSelector(getIsFetching);
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
    return (
        <div>
            {isFetching ? <Preloader /> : null}
            <FindUsers
                follow={internalFollow}
                unfollow={internalUnfollow}
                findUser={internalFindUser}
                resetFind={internalResetFind} />
        </div>
    )
}

export default withAuthRedirect(FindUsersPage);