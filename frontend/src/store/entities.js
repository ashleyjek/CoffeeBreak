import { combineReducers } from "redux"
import usersReducer from "./users";
import postsReducer from "./posts";
import commentsReducer from "./comments";
import friendshipsReducer from "./friendships";
import likesReducer from "./likes";

const entitiesReducer = combineReducers({
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
    friendships: friendshipsReducer,
    likes: likesReducer
})

export default entitiesReducer;

