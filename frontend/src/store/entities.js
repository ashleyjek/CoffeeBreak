import { combineReducers } from "redux"
import usersReducer from "./users";
import postsReducer from "./posts";
import commentsReducer from "./comments";
import friendshipsReducer from "./friendships";

const entitiesReducer = combineReducers({
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
    friendships: friendshipsReducer
})

export default entitiesReducer;

