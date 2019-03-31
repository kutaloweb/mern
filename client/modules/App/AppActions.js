export const TOGGLE_ADD_POST = 'TOGGLE_ADD_POST';
export const CLOSE_ADD_POST = 'CLOSE_ADD_POST';

export function toggleAddPost() {
  return {
    type: TOGGLE_ADD_POST,
  };
}

export function closeAddPost() {
  return {
    type: CLOSE_ADD_POST,
  };
}
