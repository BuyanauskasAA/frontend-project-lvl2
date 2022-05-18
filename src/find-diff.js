import _ from 'lodash';
import parse from './parsers.js';
import stylish from './stylish.js';

const findDiff = (filepath1, filepath2, formater = stylish) => {
  const file1 = parse(filepath1);
  const file2 = parse(filepath2);

  const iter = (value1, value2) => {
    const keys = _.uniq([...Object.keys(value1), ...Object.keys(value2)]);

    const diff = keys.map((key) => {
      if (!_.has(value2, key)) {
        return {
          name: key,
          status: 'deleted',
          value: value1[key],
        };
      }

      if (!_.has(value1, key)) {
        return {
          name: key,
          status: 'added',
          value: value2[key],
        };
      }

      if (_.isObject(value1[key]) && _.isObject(value2[key])) {
        return {
          name: key,
          status: 'internal-values',
          children: iter(value1[key], value2[key]),
        };
      }

      if (value1[key] !== value2[key]) {
        return {
          name: key,
          status: 'edited',
          oldValue: value1[key],
          newValue: value2[key],
        };
      }

      return {
        name: key,
        status: 'not-edited',
        value: value1[key],
      };
    });

    return diff;
  };

  return formater(iter(file1, file2));
};

export default findDiff;
