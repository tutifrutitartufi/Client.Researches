import { combineReducers } from "redux";
import UserReducer from "./User";

const RootReducer = combineReducers({
    Users: UserReducer,
});
export default RootReducer;
