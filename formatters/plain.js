import _ from 'lodash';

const formatedValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const plain = (diff) => {
  const iter = (elements, path) => {
    const lines = _.sortBy(elements, ((element) => element.name))
      .flatMap((element) => {
        const {
          name, status, value, oldValue, newValue, children,
        } = element;
        const currentPath = (path.length > 0) ? `${path}.${name}` : `${name}`;

        switch (status) {
          case 'deleted':
            return `Property '${currentPath}' was removed`;
          case 'added':
            return `Property '${currentPath}' was added with value: ${formatedValue(value)}`;
          case 'edited':
            return `Property '${currentPath}' was updated. From ${formatedValue(oldValue)} to ${formatedValue(newValue)}`;
          case 'not-edited':
            return [];
          case 'internal-values': {
            return iter(children, currentPath);
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
