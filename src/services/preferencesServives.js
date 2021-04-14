import https from '../utils/https';

/**
 * Add preferences service
 */
export async function addPreferences(name) {
  return await https.post(`/preferences/`, {
    name: name,
  });
}

/**
 * View preferences service
 */
export async function viewPreferences() {
  return await https.get(`/preferences/`, {});
}

/**
 * View each preference service
 */
export async function viewEachPreference(id) {
  return await https.get(`/preferences/${id}`, {});
}

/**
 * Update preference service
 */
export async function updatePreferences(name, id) {
  return await https.put(`/preferences/${id}`, {
    name: name,
  });
}

/**
 * Delete service
 */
export async function deletePreference(id) {
  return await https.remove(`/preferences/${id}`, {});
}
