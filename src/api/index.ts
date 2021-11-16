import axios from "axios";

export const setAuthorization = (token: string) => {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}
export const uploadUrl = "/oss/upload";