import jwtDecode from 'jwt-decode';
import callApi from '../../util/apiCaller';
import { closeAddPost } from '../App/AppActions';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const GET_ERRORS = 'GET_ERRORS';

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export function registerUser(userData, router) {
  return (dispatch) => {
    return callApi('users/register', 'post', userData)
      .then(() => router.push('/login'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err,
        })
      );
  };
}

export function loginUser(userData) {
  return (dispatch) => {
    return callApi('users/login', 'post', userData, true)
      .then(res => {
        const { token } = res;
        localStorage.setItem('jwtToken', token);
        const decoded = jwtDecode(token);
        dispatch(setCurrentUser(decoded));
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err,
        });
      }
      );
  };
}

export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken');
  dispatch(setCurrentUser({}));
  dispatch(closeAddPost());
};
