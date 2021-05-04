import {
    AuthenticateType,
    GetUsersType,
    GetUserType,
    EditUserType,
    DeleteUserType
} from "../Actions/ActionTypes";
import toast from '../Utils/Toast';

export default function (state = [], action) {

    if(action && action.payload && action.payload.statusText) {
        toast.success(action.payload.statusText + ' || ' + action.type);
    } else if(action && action.error && action.payload && action.payload.request && action.payload.request.statusText) {
        toast.error(action.payload.request.statusText + ' || ' + action.type);
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
