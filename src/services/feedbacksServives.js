import https from '../utils/https';

/**
 * View feedback service
 */
export async function viewFeedbacks(status) {
  return await https.get(`/feedbacks/${status}`, {});
}

/**
 * View each feedback service
 */
export async function viewEachFeedback(id) {
  return await https.get(`/feedbacks/${id}`, {});
}

/**
 * Update feedback service
 */
export async function updateFeedbacks(status, id) {
  return await https.put(`/feedbacks/${id}`, {
    status: status,
  });
}

/**
 * Delete service
 */
export async function deleteFeedback(id) {
  return await https.remove(`/feedbacks/${id}`, {});
}
