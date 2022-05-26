import _ from 'lodash';

const replacer = {
  oldValueBar: '  - ',
  newValueBar: '  + ',
  notEditedBar: '    ',
  space: '    ',
};

const formatedValue = (value, depth) => {
  const { space } = replacer;
  const indent = space.repeat(depth);
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const lines = Object
    .entries(value)
    .map(([key, val]) => `${indent}${space}${key}: ${formatedValue(val, depth + 1)}`);
  return [
    '{',
    ...lines,
    `${indent}}`,
  ].join('\n');
};

const stylish = (diff) => {
  const iter = (elements, depth) => {
    const {
      oldValueBar, newValueBar, notEditedBar, space,
    } = replacer;
    const indent = space.repeat(depth);
    const lines = _.sortBy(elements, ((element) => element.name))
      .flatMap((element) => {
        const {
          name, status, value, oldValue, newValue, children,
        } = element;
        const currentValue = formatedValue(value, depth + 1);

        switch (status) {
          case 'deleted':
            return `${indent}${oldValueBar}${name}: ${currentValue}`;
          case 'added':
            return `${indent}${newValueBar}${name}: ${currentValue}`;
          case 'not-edited':
            return `${indent}${notEditedBar}${name}: ${currentValue}`;
          case 'edited':
            return [
              `${indent}${oldValueBar}${name}: ${formatedValue(oldValue, depth + 1)}`,
              `${indent}${newValueBar}${name}: ${formatedValue(newValue, depth + 1)}`,
            ];
          case 'internal-values':
            return `${indent}${notEditedBar}${name}: ${iter(children, depth + 1)}`;
          default:
            return null;
        }
      });

    return [
      '{',
      ...lines,
      `${indent}}`,
    ].join('\n');
  };

  return iter(diff, 0);
};

export default stylish;
