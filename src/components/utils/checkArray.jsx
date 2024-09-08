export const checkArray = (val) => {
  if (Array.isArray(val)) {
    return val[0];
  }
  return val;
};
