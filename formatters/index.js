import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (formatName = 'stylish') => {
  switch (formatName) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    case 'json':
      return json;
    default:
      return null;
  }
};
