import _ from "lodash";

// eslint-disable-next-line eqeqeq
export const isBooleanLike = (val) => _.isBoolean(val) || val == 1 || val == 0;

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
  boolean: isBooleanLike,
  float: _.isNumber,
  int: _.isInteger,
  arrayOfInt: isArrayOfInt,
  arrayOfString: isArrayOfString,
  arrayOfFloat: isArrayOfFlat,
  arrayOfCommune: isArrayOfCommune,
  arrayOfFlat: isArrayOfFlat,
};

export const isValid = (object, scheme) => {
  const isInvalidField = (prop) => {
    if (prop.filter) {
      return false;
    }

    if (_.isUndefined(object[prop.name]) && !_.isUndefined(prop.default)) {
      return false;
    }

    return !validFuncs[prop.type](object[prop.name]);
  };

  const invalidField = _.find(scheme, isInvalidField);

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
