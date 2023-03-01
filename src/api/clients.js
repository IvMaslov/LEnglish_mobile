import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const instance = axios.create({
    baseURL: "http://91.90.193.215",
    headers: {'content-type': 'application/json;'}
});

instance.interceptors.request.use(async (request) => {
    request.headers["Authorization"] = "Bearer " + await AsyncStorage.getItem("access");
    return request
});

instance.interceptors.response.use((response) => {
    return response
}, async (error) => {
    const originalRequest = error.config;
    console.log("!!!nice", error.config.url);
    if (error.response.status === 401 && !error.config._isRetry && error.config) {
        originalRequest._isRetry = true;
        try {
            const newRefreshResp = await axios.post("http://91.90.193.215/auth/refresh",{"refresh":(await AsyncStorage.getItem("refresh") ? await AsyncStorage.getItem("refresh") : "error")});
            await AsyncStorage.setItem("access", newRefreshResp.data.access);
            return instance.request(originalRequest);
        } catch (error) {
            throw error;
        }
    }
    else throw error
});

export default instance;