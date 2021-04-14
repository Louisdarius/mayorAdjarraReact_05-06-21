import https from '../utils/https';

export const Service = {
  detail,
};

async function detail(userId) {
  return await https.get(`/user/logout/${userId}/`, {});
}
export default Object.freeze({
  detail,
});
