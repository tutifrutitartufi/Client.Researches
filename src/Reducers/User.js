import {
    GetUsersType
} from "../Actions/ActionTypes";

export default function (state = [], action) {
    switch (action.type) {
        case GetUsersType:
            return [action.payload.data, ...state];
    }
    return state;
}
