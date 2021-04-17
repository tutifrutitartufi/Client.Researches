import {
    AuthenticateType,
    GetUsersType,
    GetUserType,
    EditUserType,
    DeleteUserType
} from "../Actions/ActionTypes";

export default function (state = [], action) {
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
