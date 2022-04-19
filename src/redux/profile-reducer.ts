import { PhotosType } from "./../types/types";
import { InferActionsTypes, ThunkType } from "./redux-store";
import { profileApi } from "../api/profile-api";
import { usersAPI } from "../api/users-api";
import { ProfileType } from "../types/types";

export const actions = {
    addPostActionCreator: (postText: string) =>
        ({ type: "ADD_POST", postText } as const),
    setUserProfile: (profile: ProfileType) =>
        ({ type: "SET_USER_PROFILE", profile: profile } as const),
    setStatus: (status: string) =>
        ({ type: "SET_STATUS", status: status } as const),
    savePhotoSucces: (photo: PhotosType) =>
        ({ type: "SAVE_PHOTO", photo: photo } as const),
    updateProfileData: (profileData: ProfileType) =>
        ({ type: "UPDATE_PROFILE", profile: profileData } as const),
};

function getUserProfile(userId: number): ProfileThunkType {
    return async (dispatch) => {
        let data = await usersAPI.getProfile(userId);
        dispatch(actions.setUserProfile(data));
    };
}
function savePhoto(image: string): ProfileThunkType {
    return async (dispatch) => {
        let response = await profileApi.setPhoto(image);
        dispatch(actions.savePhotoSucces(response.data.photos));
    };
}
function getStatus(userId: number): ProfileThunkType {
    return async (dispatch) => {
        let data = await profileApi.getStatus(userId);
        dispatch(actions.setStatus(data));
    };
}
function updateStatus(status: string): ProfileThunkType {
    return async (dispatch) => {
        let data = await profileApi.updateStatus(status);
        if (data.resultCode === 0) {
            dispatch(actions.setStatus(status));
        }
    };
}
function saveProfile(formData: ProfileType): ProfileThunkType {
    return async (dispatch, getState) => {
        let data = await profileApi.saveProfile({
            ...formData,
            photos: getState().ProfileData.profile?.photos as PhotosType,
        });
        if (data.data.resultCode === 0) {
            dispatch(
                actions.updateProfileData({
                    ...formData,
                    photos: getState().ProfileData.profile
                        ?.photos as PhotosType,
                })
            );
        }
    };
}

let initialState = {
    PostsData: [
        { id: 1, message: "Hello, i'm first post" },
        { id: 2, message: "I'm your 2 post" },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
};

let profileReducer = (
    state = initialState,
    action: ActionsTypes
): InitialStateType => {
    switch (action.type) {
        case "ADD_POST": {
            return {
                ...state,
                PostsData: [
                    ...state.PostsData,
                    {
                        id: state.PostsData.length + 1,
                        message: action.postText,
                    },
                ],
            };
        }
        case "SET_USER_PROFILE": {
            return { ...state, profile: action.profile };
        }
        case "SET_STATUS": {
            return { ...state, status: action.status };
        }
        case "SAVE_PHOTO": {
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photo,
                } as ProfileType,
            };
        }
        case "UPDATE_PROFILE": {
            return { ...state, profile: { ...action.profile } };
        }
        default:
            return state;
    }
};

export {
    profileReducer,
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile,
};

export type PostType = { id: number; message: string };
export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ProfileThunkType = ThunkType<ActionsTypes>;
