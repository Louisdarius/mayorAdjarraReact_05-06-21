import https from '../utils/https';

/**
 * Add roles service
 */
export async function addRoles(name) {
  return await https.post(`/roles/`, {
    name: name,
  });
}

/**
 * View roles service
 */
export async function viewRoles() {
  return await https.get(`/roles/`, {});
}

/**
 * View each role service
 */
export async function viewEachRole(id) {
  return await https.get(`/roles/${id}`, {});
}

/**
 * Update role service
 */
export async function updateRoles(name, id) {
  return await https.put(`/roles/${id}`, {
    name: name,
  });
}

/**
 * Delete service
 */
export async function deleteRole(id) {
  return await https.remove(`/roles/${id}`, {});
}
