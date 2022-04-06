import { instanse, GetItemsType, ResponseType } from './api';
import { profileApi } from "./profile-api";

export const usersAPI = {
    getUsers() {
        return instanse.get<GetItemsType>("users?page=5").then(response => response.data);
    },
    getProfile(userId: number) {
        return profileApi.getProfile(userId);
    },
    followUser(userId: number) {
        return instanse.post<ResponseType>(`follow/${userId}`).then(response => response.data);
    },
    unfollowUser(userId: number) {
        return instanse.delete(`follow/${userId}`).then(response => response.data) as Promise<ResponseType>;
    },
    findUser(term: string, friend: null | boolean) {
        return instanse.get(`users?term=${term}` + (friend!=null ? `&friend=${friend}` : "")).then(response => response.data);
    }
};