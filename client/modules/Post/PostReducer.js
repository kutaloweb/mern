import { ADD_POST, ADD_POSTS, DELETE_POST, GET_ERRORS, CLEAR_ERRORS } from './PostActions';

// Initial State
const initialState = { data: [] };

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST :
      return {
        data: [action.post, ...state.data],
      };

    case ADD_POSTS :
      return {
        data: action.posts,
      };

    case DELETE_POST :
      return {
        data: state.data.filter(post => post.cuid !== action.cuid),
      };

    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        errors: {},
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getPosts = state => state.posts.data;

// Get validation errors
export const getErrors = state => state.errors;

// Get post by cuid
export const getPost = (state, cuid) => state.posts.data.filter(post => post.cuid === cuid)[0];

// Export Reducer
export default PostReducer;
