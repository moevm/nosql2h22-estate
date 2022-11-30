import _ from "lodash";

export const isArrayOfInt = (arr) => _.isArray(arr) && arr.every(_.isInteger);
export const isArrayOfString = (arr) => _.isArray(arr) && arr.every(_.isString);
export const isArrayOfFloat = (arr) => _.isArray(arr) && arr.every(_.isNumber);

export const isCommune = (obj) =>
  _.isInteger(obj.roomsCount) && _.isInteger(obj.count);
export const isFlat = (obj) =>
  _.isInteger(obj.roomsCount) && _.isInteger(obj.count);

export const isArrayOfCommune = (arr) => _.isArray(arr) && arr.every(isCommune);
export const isArrayOfFlat = (arr) => _.isArray(arr) && arr.every(isFlat);

const validFuncs = {
  string: _.isString,
  boolean: _.isBoolean,
  float: _.isNumber,
  int: _.isInteger,
  arrayOfInt: isArrayOfInt,
  arrayOfString: isArrayOfString,
  arrayOfFloat: isArrayOfFlat,
  arrayOfCommune: isArrayOfCommune,
  arrayOfFlat: isArrayOfFlat,
};

export const isValid = (object, scheme) => {
  const invalidField = _.find(
    scheme,
    ({ name, type, filter }) => !filter && !validFuncs[type](object[name])
  );

  return invalidField
    ? {
        valid: false,
        message: `"${invalidField.name}" should be "${
          invalidField.type
        }", but got "${object[invalidField.name]}" of type "${typeof object[
          invalidField.name
        ]}"`,
      }
    : { valid: true };
};
