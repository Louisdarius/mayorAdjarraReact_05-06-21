import https from '../utils/https';

export const Service = {
  detail,
};

async function detail() {
  return await https.get(`/user/`, {});
}
export default Object.freeze({
  detail,
});
