import callApi from '../../util/apiCaller';

export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const GET_ERRORS = 'GET_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function clearErrors() {
  return {
    type: CLEAR_ERRORS,
  };
}

export function addPostRequest(post) {
  return (dispatch) => {
    dispatch(clearErrors());
    return callApi('posts', 'post', {
      post: {
        title: post.title,
        content: post.content,
      } }, true)
      .then(res => dispatch(addPost(res.post)))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err,
        })
      );
  };
}

export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts,
  };
}

export function fetchPosts() {
  return (dispatch) => {
    return callApi('posts').then(res => {
      dispatch(addPosts(res.posts));
    });
  };
}

export function fetchPost(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`).then(res => dispatch(addPost(res.post)));
  };
}

export function deletePost(cuid) {
  return {
    type: DELETE_POST,
    cuid,
  };
}

export function deletePostRequest(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`, 'delete', {}, true).then(() => dispatch(deletePost(cuid)));
  };
}
