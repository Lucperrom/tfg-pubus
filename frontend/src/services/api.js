import axios from "axios";
import TokenService from "./token.service";

const instance = axios.create({
    baseURL: "/api",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
    },
});

instance.interceptors.request.use(
    (config) => {
        const tokenType = TokenService.localAccessToken?.type;
        const token = TokenService.localAccessToken?.value;
        if (token && tokenType) {
            config.headers["Authorization"] = `${tokenType} ${token}`;
        }
        return config;
    }
);

export default instance;
