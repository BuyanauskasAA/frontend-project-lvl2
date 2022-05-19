import stylish from './stylish.js';
import plain from './plain.js';

export default (formatName = 'stylish') => {
  switch (formatName) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    default:
      return null;
  }
};
