export default function (state = {}, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, token: action.token, isAuth: true };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
}
