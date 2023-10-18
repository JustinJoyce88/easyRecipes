import { RN_ENV_API_URL_PROD, RN_ENV_API_URL_DEV } from '@env';

const PROD = true;
const API_URL = PROD ? RN_ENV_API_URL_PROD : RN_ENV_API_URL_DEV;

export { API_URL };
