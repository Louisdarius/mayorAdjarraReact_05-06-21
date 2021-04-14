import https from '../utils/https';
const { putToken, saveUser } = require('../utils/token');

/**
 * Add user service
 */
export async function addUser(
  firstName,
  lastName,
  tel,
  email,
  password,
  gender
) {
  return await https.post(`/users/`, {
    firstName: firstName,
    lastName: lastName,
    tel: tel,
    email: email,
    password: password,
    gender: gender,
  });
}

/**
 * View users service
 */
export async function viewUsers(filter) {
  return await https.get(`/users/${filter}`, {});
}

/**
 * View each user service
 */
export async function viewEachUser(id) {
  return await https.get(`/users/${id}/`, {});
}

/**
 * View user profile service
 */
export async function viewUserProfile() {
  return await https.get(`/users/me/`, {});
}

export async function viewImage() {
  return await https.get(`/users/image/me/`, {});
}

export async function updateUserProfile(
  firstName,
  lastName,
  tel,
  email,
  gender
) {
  return await https.put(`/users/profile/me`, {
    firstName: firstName,
    lastName: lastName,
    tel: tel,
    email: email,
    gender: gender,
  });
}

/**
 * Update user service
 */
export async function updateUsers(
  firstName,
  lastName,
  tel,
  email,
  gender,
  status,
  role,
  id
) {
  return await https.put(`/users/${id}`, {
    firstName: firstName,
    lastName: lastName,
    tel: tel,
    email: email,
    gender: gender,
    status: status,
    role: role,
  });
}

export async function updateUserProfileImage(data) {
  console.log(data);
  return await https.put(`/users/profile/photo/me/`, data);
}
/**
 * Login service
 */
export async function login(email, password) {
  const response = await https.post('/users/login/', {
    email: email,
    password: password,
  });

  if (response.status === 200) {
    putToken(response.data.token);
    saveUser(response.data.user);
  }
  return response;
}

/**
 * Change password service
 */
/**
 * Login service
 */
export async function changeUserPassword(oldPassword, password) {
  return await https.post(`/users/changeUserProfilePassword`, {
    oldPassword: oldPassword,
    password: password,
  });
}

export async function changePasswordByUser(password, id) {
  return await https.post(`/users/changeUserPassword/${id}`, {
    password: password,
  });
}

/**
 * Logout userservice
 */
export async function logout() {
  return await https.post(`/users/logout`, {});
}

/**
 * Delete user service
 */
export async function deleteUser(id) {
  return await https.remove(`/users/${id}`, {});
}
