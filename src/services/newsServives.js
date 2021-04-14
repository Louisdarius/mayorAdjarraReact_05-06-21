import https from '../utils/https';

/**
 * Add appointments service
 */
export async function addNews(title, subTitle, content) {
  return await https.post(`/news/`, {
    title: title,
    subTitle: subTitle,
    content: content,
  });
}

/**
 * View appointments service
 */
export async function viewNews() {
  return await https.get(`/news/`, {});
}

/**
 * View each appointment service
 */
export async function viewEachNews(id) {
  return await https.get(`/news/${id}`, {});
}

/**
 * Update appointment service
 */
export async function updateNews(title, subTitle, content, id) {
  return await https.put(`/news/${id}`, {
    title: title,
    subTitle: subTitle,
    content: content,
  });
}

/**
 * Delete service
 */
export async function deleteNews(id) {
  return await https.remove(`/news/${id}`, {});
}
