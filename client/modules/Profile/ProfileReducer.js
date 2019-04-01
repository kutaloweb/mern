import { GET_PROFILE, CLEAR_CURRENT_PROFILE, GET_ERRORS } from './ProfileActions';

const initialState = {
  profile: null,
  profiles: null,
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };

    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null,
      };

    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };

    default:
      return state;
  }
};

export default ProfileReducer;
