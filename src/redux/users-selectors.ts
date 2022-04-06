import { UserType } from "./../types/types";
import { createSelector } from "reselect";
import { AppStateType } from "./redux-store";

function getIsFollowingInProgress(state: AppStateType) {
    return state.UserPageData.isFollowingInProgress;
}
function getUsers(state: AppStateType) {
    return state.UserPageData.UsersData;
}
let getUsersArraySuper = createSelector(
    getUsers,
    (users: Array<UserType>): Array<UserType> => {
        return users.filter((u) => true);
    }
);
function getIsFetching(state: AppStateType) {
    return state.UserPageData.isFetching;
}
function getIsAuth(state: AppStateType) {
    return state.auth.isAuth;
}

export {
    getIsAuth,
    getIsFetching,
    getUsersArraySuper,
    getIsFollowingInProgress,
};
