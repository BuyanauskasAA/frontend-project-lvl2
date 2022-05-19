import _ from 'lodash';

const plain = (diff) => {
  const formatedValue = (currentValue) => {
    if (_.isObject(currentValue)) {
      return '[complex value]';
    }
    if (_.isString(currentValue)) {
      return `'${currentValue}'`;
    }
    return currentValue;
  };

  const iter = (elements, path) => {
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

        path.push(name);

        switch (status) {
          case 'deleted': {
            const result = `Property '${path.join('.')}' was removed`;
            path.pop();
            return result;
          }
          case 'added': {
            const result = `Property '${path.join('.')}' was added with value: ${formatedValue(value)}`;
            path.pop();
            return result;
          }
          case 'edited': {
            const result = `Property '${path.join('.')}' was updated. From ${formatedValue(oldValue)} to ${formatedValue(newValue)}`;
            path.pop();
            return result;
          }
          case 'not-edited': {
            path.pop();
            return [];
          }
          case 'internal-values': {
            const result = iter(children, path);
            path.pop();
            return result;
          }
          default:
            return null;
        }
      });

    return lines.join('\n');
  };

  return iter(diff, []);
};

export default plain;
