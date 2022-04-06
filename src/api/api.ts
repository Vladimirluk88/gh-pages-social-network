import { ResultCodesEnum } from './auth-api';
import axios from "axios";
import { UserType } from "../types/types";

export const instanse = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "7c1e154d-c9fa-462a-a3ab-37087c5bc201",
    }
})

export type GetItemsType = {
    items: Array<UserType>,
    totalCount: number,
    error: string | null
}

export type ResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D;
    messages: Array<string>;
    resultCode: RC;
};