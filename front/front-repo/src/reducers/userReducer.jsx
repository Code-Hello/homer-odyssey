export default function (state = {}, action) {
  switch (action.type) {
    case 'STORE_USER':
      return { ...state, user: action.user };
    default:
      return state;
  }
}
