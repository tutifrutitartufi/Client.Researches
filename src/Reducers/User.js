import {
    GetUsersType,
    AuthenticateType
} from "../Actions/ActionTypes";

export default function (state = [], action) {
    switch (action.type) {
        case AuthenticateType:
            return [action.payload.data, ...state];
        case GetUsersType:
            return [action.payload.data, ...state];
    }
    return state;
}
