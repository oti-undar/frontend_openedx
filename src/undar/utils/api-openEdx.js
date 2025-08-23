let getAuthenticatedUser;
try {
  // eslint-disable-next-line global-require
  ({ getAuthenticatedUser } = require('@edx/frontend-platform/auth'));
} catch {
  getAuthenticatedUser = () => ({ id: 'xxx' });
}

export async function getUserId() {
  const data = getAuthenticatedUser();
  console.log('🚀 ~ file: api-openEdx.js:5 ~ data:', data);

  return data;
}
