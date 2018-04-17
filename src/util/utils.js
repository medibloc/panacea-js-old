const isHexadecimal = (string) => {
  const regexp = /^[0-9a-fA-F]+$/;
  if (regexp.test(string)) return true;
  return false;
};

export default {
  isHexadecimal,
};
