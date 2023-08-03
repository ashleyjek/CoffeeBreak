import { combineReducers } from "redux"
import usersReducer from "./users";
import postsReducer from "./posts";
import commentsReducer from "./comments";
import friendshipsReducer from "./friendships";
import likesReducer from "./likes";
import searchReducer from "./search";

const entitiesReducer = combineReducers({
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
    friendships: friendshipsReducer,
    likes: likesReducer,
    search: searchReducer
})

export default entitiesReducer;

