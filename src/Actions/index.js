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
    NewResearchType,
    GetPostsType,
    NewPostType,
    DeletePostType,
    GetCanvassesType,
    NewCanvasType,
    DeleteCanvasType,
    GetQuestionsType, NewQuestionType, DeleteQuestionType
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

export function NewResearch(research) {
    const Url = `${process.env.REACT_APP_API_URL}Research`;
    const Request = axios.post(Url, {
        ...research
    },{
        headers: {
            'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user'))['token']}`
        }
    });
    return {
        type: NewResearchType,
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

export function NewPost(id, post) {
    const Url = `${process.env.REACT_APP_API_URL}Research/${id}/Post`;
    const Request = axios.post(Url, {
        ...post
    },{
        headers: {
            'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user'))['token']}`
        }
    });
    return {
        type: NewPostType,
        payload: Request,
    };
}

export function DeletePost(researchId, id) {
    const Url = `${process.env.REACT_APP_API_URL}Research/${researchId}/Post/${id}`;
    const Request = axios.delete(Url, {
        headers: {
            'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user'))['token']}`
        }
    });
    return {
        type: DeletePostType,
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
        type: GetCanvassesType,
        payload: Request,
    };
}

export function NewCanvas(id, canvas) {
    const Url = `${process.env.REACT_APP_API_URL}Research/${id}/Canvas`;
    const Request = axios.post(Url, {
        ...canvas
    },{
        headers: {
            'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user'))['token']}`
        }
    });
    return {
        type: NewCanvasType,
        payload: Request,
    };
}

export function DeleteCanvas(researchId, id) {
    const Url = `${process.env.REACT_APP_API_URL}Research/${researchId}/Canvas/${id}`;
    const Request = axios.delete(Url, {
        headers: {
            'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user'))['token']}`
        }
    });
    return {
        type: DeleteCanvasType,
        payload: Request,
    };
}

export function GetQuestions(id, canvasId) {
    const Url = `${process.env.REACT_APP_API_URL}Research/${id}/Canvas/${canvasId}/Question`;
    const Request = axios.get(Url,{
        headers: {
            'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user'))['token']}`
        }
    });
    return {
        type: GetQuestionsType,
        payload: Request,
    };
}

export function NewQuestion(id, canvasId, question) {
    const Url = `${process.env.REACT_APP_API_URL}Research/${id}/Canvas/${canvasId}/Question`;
    const Request = axios.post(Url, {
        ...question
    },{
        headers: {
            'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user'))['token']}`
        }
    });
    return {
        type: NewQuestionType,
        payload: Request,
    };
}

export function DeleteQuestion(researchId, canvasId, questionId) {
    const Url = `${process.env.REACT_APP_API_URL}Research/${researchId}/Canvas/${canvasId}/Question/${questionId}`;
    const Request = axios.delete(Url, {
        headers: {
            'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user'))['token']}`
        }
    });
    return {
        type: DeleteQuestionType,
        payload: Request,
    };
}



