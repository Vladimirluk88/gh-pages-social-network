import { instanse, ResponseType } from "./api";
import { ProfileType, PhotosType } from "../types/types";

type SavePhotoResponseDataType = {
    photos: PhotosType;
};

export const profileApi = {
    getProfile(userId: number) {
        return instanse
            .get<ProfileType>("/profile/" + userId)
            .then((response) => response.data);
    },
    getStatus(userId: number) {
        return instanse
            .get<string>("/profile/status/" + userId)
            .then((response) => response.data);
    },
    updateStatus(status: string) {
        return instanse
            .put<ResponseType>("/profile/status/", { status: status })
            .then((response) => response.data);
    },
    setPhoto(photo: string) {
        const formData = new FormData();
        formData.append("image", photo);
        return instanse
            .put<ResponseType<SavePhotoResponseDataType>>(
                "/profile/photo/",
                formData,
                {
                    headers: {
                        "Content-type": "multipart/form-data",
                    },
                }
            )
            .then((response) => response.data);
    },
    saveProfile(profile: ProfileType) {
        return instanse.put<ResponseType>("/profile", profile);
    },
};
