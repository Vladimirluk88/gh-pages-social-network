import { instanse, GetItemsType, ResponseType } from "./api";
import { profileApi } from "./profile-api";

export const usersAPI = {
    getUsers(
        term: string | null = "",
        friend: null | boolean = null,
        page: number = 1
    ) {
        const termString = `term=${term}`;
        const friendString = `friend=${friend}`;
        /* eslint-disable */
        if ((term === "" || term === null) && friend === null) {
            return instanse
                .get<GetItemsType>("users?page=" + `${page}`)
                .then((response) => response.data);
        } else if (term !== "" && term !== null && friend === null) {
            return instanse
                .get<GetItemsType>("users" + "?" + termString)
                .then((response) => response.data);
        } else if ((term === "" || term === null) && friend !== null) {
            return instanse
                .get<GetItemsType>("users" + "?" + friendString)
                .then((response) => response.data);
        } else if (term !== "" && term !== null && friend !== null) {
            return instanse
                .get<GetItemsType>(
                    "users" + "?" + termString + "&" + friendString
                )
                .then((response) => response.data);
        } else
            return instanse
                .get<GetItemsType>("users?page=1")
                .then((response) => response.data);
        /* eslint-enable */
    },
    getProfile(userId: number) {
        return profileApi.getProfile(userId);
    },
    followUser(userId: number) {
        return instanse
            .post<ResponseType>(`follow/${userId}`)
            .then((response) => response.data);
    },
    unfollowUser(userId: number) {
        return instanse
            .delete(`follow/${userId}`)
            .then((response) => response.data) as Promise<ResponseType>;
    },
};
