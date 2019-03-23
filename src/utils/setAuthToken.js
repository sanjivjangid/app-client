import axios from "axios";

// helper to set and remove auth header
const setAuthToken = token => {
    if (token) {
        // Apply token
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        // Delete header
        delete axios.defaults.headers.common["Authorization"];
    }
};
export default setAuthToken;


