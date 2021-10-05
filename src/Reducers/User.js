import {
    AuthenticateType,
    GetUsersType,
    GetUserType,
    EditUserType,
    DeleteUserType
} from "../Actions/ActionTypes";
import toast from '../Utils/Toast';

export default function (state = [], action) {

    console.log(action);

    if(action && action.error && action.payload && action.payload.response && action.payload.response.data) {
        toast.error(action.payload.response.data);
    } else if(action && action.payload  && action.payload.data) {
        toast.success(action.payload.data);
    }else if(action && action.error && action.payload && action.payload.response) {
        toast.error(action.payload.response.statusText);
    }



    switch (action.type) {
        case AuthenticateType:
            return [action.payload.data, ...state];
        case GetUsersType:
            return [action.payload.data, ...state];
        case GetUserType:
            return [action.payload.data, ...state];
        case EditUserType:
            return [action.payload.data, ...state];
        case DeleteUserType:
            return [action.payload.data, ...state];
    }
    return state;
}
