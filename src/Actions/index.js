import axios from "axios";
import {
    AuthenticateType,
    GetUsersType,
    GetUserType,
    DeleteUserType,
    EditUserType,
    NewUserType,
    GetResearchesType,
    DeleteResearchType,
    GetResearchType,
    GetPostsType
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
        type: DeleteUserType,
        payload: Request,
    };
}

export function EditUser(user) {
    const Url = `${process.env.REACT_APP_API_URL}User`;
    const Request = axios.put(Url, {
        ...user
    },{
        headers: {
            'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user'))['token']}`
        }
    });
    return {
        type: EditUserType,
        payload: Request,
    };
}
export function NewUser(user) {
    const Url = `${process.env.REACT_APP_API_URL}User`;
    const Request = axios.post(Url, {
        ...user
    },{
        headers: {
            'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user'))['token']}`
        }
    });
    return {
        type: NewUserType,
        payload: Request,
    };
}

export function GetResearches() {
    const Url = `${process.env.REACT_APP_API_URL}Research`;
    const Request = axios.get(Url,{
        headers: {
            'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user'))['token']}`
        }
    });
    return {
        type: GetResearchesType,
        payload: Request,
    };
}

export function DeleteResearch(id) {
    const Url = `${process.env.REACT_APP_API_URL}Research/${id}`;
    const Request = axios.delete(Url, {
        headers: {
            'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user'))['token']}`
        }
    });
    return {
        type: DeleteResearchType,
        payload: Request,
    };
}

export function GetResearch(id) {
    const Url = `${process.env.REACT_APP_API_URL}Research/${id}`;
    const Request = axios.get(Url, {
        headers: {
            'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user'))['token']}`
        }
    });
    return {
        type: GetResearchType,
        payload: Request,
    };
}

export function GetPosts(id) {
    const Url = `${process.env.REACT_APP_API_URL}Research/${id}/Post`;
    const Request = axios.get(Url,{
        headers: {
            'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user'))['token']}`
        }
    });
    return {
        type: GetPostsType,
        payload: Request,
    };
}

export function GetCanvasses(id) {
    const Url = `${process.env.REACT_APP_API_URL}Research/${id}/Canvas`;
    const Request = axios.get(Url,{
        headers: {
            'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user'))['token']}`
        }
    });
    return {
        type: GetPostsType,
        payload: Request,
    };
}




