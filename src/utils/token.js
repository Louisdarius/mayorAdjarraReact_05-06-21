const saveUser = async (user) => {
  return await localStorage.setItem('user', JSON.stringify(user));
};
const getUser = async (user) => {
  return JSON.parse(await localStorage.getItem('user'));
};
const putToken = async (token) => {
  return await localStorage.setItem('secretToken', token);
};
const getToken = async () => {
  return await localStorage.getItem('secretToken');
};
export { saveUser, getUser, putToken, getToken };
export default Object.freeze({ getToken, putToken, saveUser, getUser });
