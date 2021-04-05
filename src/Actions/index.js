import axios from "axios";
import {
    AuthenticateType,
    GetUsersType,
    GetUserType,
    DeleteUserType
} from "./ActionTypes";

export function Authenticate(username, password) {
    const Url = `${process.env.REACT_APP_API_URL}User/authenticate`;
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
    const Url = `${process.env.REACT_APP_API_URL}User`;
    const Request = axios.get(Url, {
        headers: {
            'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user'))['token']}`
        }
    });
    return {
        type: GetUsersType,
        payload: Request,
    };
}

export function GetUser(id) {
    const Url = `${process.env.REACT_APP_API_URL}User/${id}`;
    const Request = axios.get(Url, {
        headers: {
            'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user'))['token']}`
        }
    });
    return {
        type: GetUserType,
        payload: Request,
    };
}
export function DeleteUser(id) {
    const Url = `${process.env.REACT_APP_API_URL}User/${id}`;
    const Request = axios.delete(Url, {
        headers: {
            'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user'))['token']}`
        }
    });
    return {
        type: GetUserType,
        payload: Request,
    };
}
