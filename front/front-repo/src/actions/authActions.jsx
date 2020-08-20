export const storeToken = (token) => {
  return { type: 'LOGIN', token };
};

export const logOut = () => {
  return { type: 'LOGOUT' };
};
