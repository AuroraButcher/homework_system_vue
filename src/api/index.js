import axios from "../utils/request";
import path from "./path";

const api = {
    //地址
    getUrl() {
        return axios.get(path.baseUrl + path.otherUrl);
    }
}
export default api