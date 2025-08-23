import { getConfig } from '../lib/globales';

export async function getUserId() {
  const data = getConfig();
  console.log('🚀 ~ file: api-openEdx.js:5 ~ data:', data);

  return data;
}
