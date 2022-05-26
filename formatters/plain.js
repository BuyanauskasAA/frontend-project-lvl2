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

        path = path.length > 0 ? `${path}.${name}` : `${name}`;

        switch (status) {
          case 'deleted': {
            const result = `Property '${path}' was removed`;
            path = _.dropRight(path.split('.')).join('.');
            return result;
          }
          case 'added': {
            const result = `Property '${path}' was added with value: ${formatedValue(value)}`;
            path = _.dropRight(path.split('.')).join('.');
            return result;
          }
          case 'edited': {
            const result = `Property '${path}' was updated. From ${formatedValue(oldValue)} to ${formatedValue(newValue)}`;
            path = _.dropRight(path.split('.')).join('.');
            return result;
          }
          case 'not-edited': {
            path = _.dropRight(path.split('.')).join('.');
            return [];
          }
          case 'internal-values': {
            const result = iter(children, path);
            path = _.dropRight(path.split('.')).join('.');
            return result;
          }
          default:
            return null;
        }
      });

    return lines.join('\n');
  };

  return iter(diff, '');
};

export default plain;
