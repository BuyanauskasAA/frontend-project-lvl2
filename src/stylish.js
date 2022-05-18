import _ from 'lodash';

const stylish = (diff) => {
  const replacer = {
    oldValueBar: '  - ',
    newValueBar: '  + ',
    notEditedBar: '    ',
  };

  const iter = (elements, depth) => {
    const space = '    ';
    const indent = space.repeat(depth);
    const { oldValueBar, newValueBar, notEditedBar } = replacer;

    const formatedValue = (currentValue, currentDepth = depth + 1) => {
      const currentIndent = space.repeat(currentDepth);
      if (!_.isObject(currentValue)) {
        return `${currentValue}`;
      }
      const result = Object
        .entries(currentValue)
        .map(([key, val]) => `${currentIndent}${notEditedBar}${key}: ${formatedValue(val, currentDepth + 1)}`);
      return [
        '{',
        ...result,
        `${currentIndent}}`,
      ].join('\n');
    };

    const lines = _.sortBy(elements, ((element) => element.name))
      .flatMap((element) => {
        const {
          name,
          status,
          value,
          oldValue,
          newValue,
          children,
        } = element;

        switch (status) {
          case 'deleted':
            return `${indent}${oldValueBar}${name}: ${formatedValue(value)}`;
          case 'added':
            return `${indent}${newValueBar}${name}: ${formatedValue(value)}`;
          case 'not-edited':
            return `${indent}${notEditedBar}${name}: ${formatedValue(value)}`;
          case 'edited':
            return [
              `${indent}${oldValueBar}${name}: ${formatedValue(oldValue)}`,
              `${indent}${newValueBar}${name}: ${formatedValue(newValue)}`,
            ];
          default:
            return `${indent}${notEditedBar}${name}: ${iter(children, depth + 1)}`;
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
