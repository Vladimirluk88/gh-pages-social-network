import { ResponseType } from "./../api/api";
import { usersAPI } from "../api/users-api";
import { updateObjectInArray } from "../utils/object-helpers";
import { UserType } from "../types/types";
import { Dispatch } from "react";
import { InferActionsTypes, ThunkType } from "./redux-store";

type ActionTypes = InferActionsTypes<typeof actions>;
type UsersThunkType = ThunkType<ActionTypes>;
export type InitialStateType = typeof initialState;

let initialState = {
    UsersData: [] as Array<UserType>,
    isFetching: true,
    isFollowingInProgress: [] as Array<number>,
};

let getUsersThunkCreator = (): UsersThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.toggleFetching(true));
        let data = await usersAPI.getUsers();
        dispatch(actions.toggleFetching(false));
        dispatch(actions.setUsers(data.items));
    };
};
let followUnfollowToggle = async (
    userId: number,
    dispatch: Dispatch<ActionTypes>,
    action: any,
    getFunc: (userId: number) => Promise<ResponseType>
) => {
    dispatch(actions.toggleFollowing(userId, true));
    let data = await getFunc(userId);
    if (data.resultCode === 0) {
        dispatch(action(userId));
    }
    dispatch(actions.toggleFollowing(userId, false));
};
let follow = (userId: number): UsersThunkType => {
    return async (dispatch: Dispatch<ActionTypes>) => {
        await followUnfollowToggle(
            userId,
            dispatch,
            actions.addToList,
            usersAPI.followUser
        );
    };
};
let unfollow = (userId: number): UsersThunkType => {
    return async (dispatch: Dispatch<ActionTypes>) => {
        await followUnfollowToggle(
            userId,
            dispatch,
            actions.removeFromList,
            usersAPI.unfollowUser
        );
    };
};
let findUser = (term: string, friend: null | "true" | "false" | "null" = null): UsersThunkType => {
    return async (dispatch) => {
        let friendBool = null;
        if(friend === "null") {
            friendBool = null
        } else if(friend != null) friendBool = (friend === "true");
        dispatch(actions.toggleFetching(true));
        let data = await usersAPI.findUser(term, friendBool);
        dispatch(actions.toggleFetching(false));
        dispatch(actions.setFindUsers(data.items));
    };
};
let resetFind = (): UsersThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleFetching(true));
        let data = await usersAPI.getUsers();
        dispatch(actions.toggleFetching(false));
        dispatch(actions.setUsers(data.items, true));
    }
}

export const actions = {
    showMore: () => ({ type: "SHOW_MORE" } as const),
    toggleFetching: (toggle: boolean) =>
        ({ type: "TOGGLE_IS_FETCHING", toggleFetching: toggle } as const),
    setUsers: (users: Array<UserType>, reset: boolean = false) =>
        ({ type: "SET_USERS", users, reset } as const),
    setFindUsers: (users: Array<UserType>) =>
        ({ type: "SET_FIND_USERS", users } as const),
    addToList: (userId: number) => ({ type: "ADD_TO_LIST", userId } as const),
    removeFromList: (userId: number) =>
        ({ type: "REMOVE_FROM_LIST", userId } as const),
    toggleFollowing: (userId: number, isFetching: boolean) =>
        ({
            type: "TOGGLE_IS_FOLLOWING_IN_PROGRESS",
            userId,
            isFetching,
        } as const),
};

let userReducer = (
    state = initialState,
    action: ActionTypes
): InitialStateType => {
    switch (action.type) {
        case "SHOW_MORE": {
            return state;
        }
        case "TOGGLE_IS_FETCHING": {
            return { ...state, isFetching: action.toggleFetching };
        }
        case "TOGGLE_IS_FOLLOWING_IN_PROGRESS": {
            return {
                ...state,
                isFollowingInProgress: action.isFetching
                    ? [...state.isFollowingInProgress, action.userId]
                    : state.isFollowingInProgress.filter(
                          (id) => id !== action.userId
                      ),
            };
        }
        case "SET_USERS": {
            if (state.UsersData.length === 0 && !action.reset) {
                return {
                    ...state,
                    UsersData: [...state.UsersData, ...action.users],
                };
            } else if (action.reset) {
                return {
                    ...state,
                    UsersData: [...action.users]
                }
            } else {
                return state;
            }
        }
        case "SET_FIND_USERS": {
            return {
                ...state,
                UsersData: [...action.users],
            };
        }
        case "ADD_TO_LIST": {
            return {
                ...state,
                UsersData: updateObjectInArray(
                    state.UsersData,
                    action.userId,
                    "id",
                    { followed: true }
                ),
            };
        }
        case "REMOVE_FROM_LIST": {
            return {
                ...state,
                UsersData: updateObjectInArray(
                    state.UsersData,
                    action.userId,
                    "id",
                    { followed: false }
                ),
            };
        }
        default:
            return state;
    }
};

export { userReducer, getUsersThunkCreator, follow, unfollow, findUser, resetFind };
