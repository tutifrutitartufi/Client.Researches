import axios from "axios";
import {
    AuthenticateType,
    GetUsersType
} from "./ActionTypes";

export function Authenticate(username, password) {
    console.log('im herer')
    const Url = `${process.env.REACT_APP_API_URL}User/authenticate`;
    console.log(Url);
    const Request = axios.post(Url, {
        username,
        password
    });
    return {
        type: AuthenticateType,
        payload: Request,
    };
}

export function GetUsers() {
    const Url = `${process.env.REACT_APP_API_URL}/api/v1/User`;
    const Request = axios.get(Url);
    return {
        type: GetUsersType,
        payload: Request,
    };
}
