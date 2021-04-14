import https from '../utils/https';

/**
 * Add feedbackList service
 */
export async function addFeedbackLists(name) {
  return await https.post(`/feedbackList/`, {
    name: name,
  });
}

/**
 * View feedbackList service
 */
export async function viewFeedbackLists() {
  return await https.get(`/feedbackList/`, {});
}

/**
 * View each feedbackList service
 */
export async function viewEachFeedbackList(id) {
  return await https.get(`/feedbackList/${id}`, {});
}

/**
 * Update feedbackList service
 */
export async function updateFeedbackLists(name, id) {
  return await https.put(`/feedbackList/${id}`, {
    name: name,
  });
}

/**
 * Delete service
 */
export async function deleteFeedbackList(id) {
  return await https.remove(`/feedbackList/${id}`, {});
}
