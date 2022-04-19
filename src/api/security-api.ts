import { instanse } from "./api";

type GetCaptchaUrlResponseType = {
    url: string;
};

export const securityApi = {
    getCaptchaUrl() {
        return instanse.get<GetCaptchaUrlResponseType>(
            "security/get-captcha-url"
        );
    },
};
