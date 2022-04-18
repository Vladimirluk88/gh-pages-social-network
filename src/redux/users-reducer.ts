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
    filter: { term: "" as null | string, friend: null as null | boolean },
    showedLastPage: 1,
    countPageMayRecieved: 0,
};

let getUsersThunkCreator = (): UsersThunkType => {
    return async (dispatch, getState) => {
        const {term, friend} = getState().UserPageData.filter;
        dispatch(actions.toggleFetching(true));
        let data = await usersAPI.getUsers(term, friend);
        dispatch(actions.toggleFetching(false));
        dispatch(actions.setCountOfPages(data.totalCount));
        dispatch(actions.setUsers(data.items, true));
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
let resetFind = (): UsersThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleFetching(true));
        let data = await usersAPI.getUsers();
        dispatch(actions.toggleFetching(false));
        dispatch(actions.setUsers(data.items, true));
    };
};

export const actions = {
    showMoreUsers: (page: number) => ({ type: "SHOW_MORE_USERS", page } as const),
    setCountOfPages: (count: number) => ({ type: "SET_COUNT_OF_PAGES", count } as const),
    toggleFetching: (toggle: boolean) =>
        ({ type: "TOGGLE_IS_FETCHING", toggleFetching: toggle } as const),
    setUsers: (users: Array<UserType>, reset: boolean = false, append: boolean = false) =>
        ({ type: "SET_USERS", users, reset, append } as const),
    addToList: (userId: number) => ({ type: "ADD_TO_LIST", userId } as const),
    removeFromList: (userId: number) =>
        ({ type: "REMOVE_FROM_LIST", userId } as const),
    toggleFollowing: (userId: number, isFetching: boolean) =>
        ({
            type: "TOGGLE_IS_FOLLOWING_IN_PROGRESS",
            userId,
            isFetching,
        } as const),
    setFilter: (
        term: string | null,
        friend: null | boolean = null
    ) => ({ type: "SET_FILTER", filter: { term, friend } as const } as const),
};

let userReducer = (
    state = initialState,
    action: ActionTypes
): InitialStateType => {
    switch (action.type) {
        case "SHOW_MORE_USERS": {
            return { ...state, showedLastPage: action.page };
        }
        case "SET_COUNT_OF_PAGES": {
            return { ...state, countPageMayRecieved: action.count };
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
            if (state.UsersData.length === 0 && !action.reset && !action.append) {
                return {
                    ...state,
                    UsersData: [...state.UsersData, ...action.users],
                };
            } else if (action.reset) {
                return {
                    ...state,
                    UsersData: [...action.users],
                };
            } else if (action.append) {
                return {
                    ...state,
                    UsersData: [...state.UsersData , ...action.users]
                }
            } else {
                return state;
            }
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
        case "SET_FILTER": {
            return {
                ...state,
                filter: { ...action.filter },
            };
        }
        default:
            return state;
    }
};

export {
    userReducer,
    getUsersThunkCreator,
    follow,
    unfollow,
    resetFind,
};
