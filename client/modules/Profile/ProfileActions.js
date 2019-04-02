import callApi from '../../util/apiCaller';

export const GET_PROFILE = 'GET_PROFILE';
export const CLEAR_CURRENT_PROFILE = 'CLEAR_CURRENT_PROFILE';
export const GET_ERRORS = 'GET_ERRORS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export function getCurrentProfile() {
  return (dispatch) => {
    return callApi('profile', 'get', undefined, true)
      .then(res =>
        dispatch({
          type: GET_PROFILE,
          payload: res.profile,
        })
      )
      .catch(err =>
        dispatch({
          type: GET_PROFILE,
          payload: {},
        })
      );
  };
}

export function createProfile(profileData, router) {
  return (dispatch) => {
    return callApi('profile', 'post', profileData, true)
      .then(res => router.push('/dashboard'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err,
        })
      );
  };
}

export function clearCurrentProfile() {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
}

export function deleteAccount() {
  return (dispatch) => {
    return callApi('profile', 'delete', undefined, true)
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {},
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err,
        })
      );
  };
}
