import encrypt from './encrypt';
import keyGen from './keyGen';
import sign from './sign';

export default {
  ...encrypt,
  ...keyGen,
  ...sign,
};
