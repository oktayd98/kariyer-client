export const API = 'http://localhost:3500';

const _fetch = (url, options = {}) => {
  return fetch(API + url, {
    method: 'GET',
    ...options,
  }).then((res) => res.json());
};

export default _fetch;
