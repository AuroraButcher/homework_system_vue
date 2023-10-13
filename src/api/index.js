import axios from "../utils/request";
import path from "./path";

const api = {
    //地址
    getUrl() {
        return axios.get(path.baseUrl + path.otherUrl);
    },
    post(url,data){
        return axios.post(path.baseUrl+path.publicUrl+url,data)
    }
}
function paramsToFormData(params) {
    const formData = new FormData();
    Object.entries(params).forEach(([key, value]) => {
        formData.append(key, value);
    });
    return formData;
}
export default api