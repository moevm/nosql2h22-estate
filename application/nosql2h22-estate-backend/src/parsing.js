const toString = (val) => "" + val;
const toBoolean = (val) => val == "1"; // eslint-disable-line eqeqeq
const toNumber = (val) => +val;
const toInteger = (val) => ~~+val; // eslint-disable-line no-bitwise
const toArrayOfInt = (val) => val.split(",").map(toInteger);
const toArrayOfStrings = (val) => val.split(",").map(toString);
const toArrayOfFloats = (val) => val.split(",").map(toNumber);

const parseFuncs = {
  string: toString,
  boolean: toBoolean,
  float: toNumber,
  int: toInteger,
  arrayOfInt: toArrayOfInt,
  arrayOfString: toArrayOfStrings,
  arrayOfFloat: toArrayOfFloats,
};

export const parse = (value, type) =>
  value && value.length ? parseFuncs[type](value) : undefined;
