import { UserType } from "../../types/types";
import { createSelector } from "reselect";
import { AppStateType } from "../redux-store";

const getIsFollowingInProgress = (state: AppStateType) => state.UserPageData.isFollowingInProgress;
const getUsers = (state: AppStateType) => state.UserPageData.UsersData
const getUsersArraySuper = createSelector(
    getUsers,
    (users: Array<UserType>): Array<UserType> => {
        return users.filter((u) => true);
    }
);
const getIsFetching = (state: AppStateType) => state.UserPageData.isFetching;
const getIsAuth = (state: AppStateType) => state.auth.isAuth;
const selectFilter = (state: AppStateType) => state.UserPageData.filter;

export {
    getIsAuth,
    getIsFetching,
    getUsersArraySuper,
    getIsFollowingInProgress,
    selectFilter
};
