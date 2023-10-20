import { RN_ENV_API_URL_DEV, RN_ENV_API_URL_PROD } from '@env';

const PROD = false;
const VERSION = '0.1.0';
const API_URL = PROD ? RN_ENV_API_URL_PROD : RN_ENV_API_URL_DEV;

export { API_URL, VERSION };
