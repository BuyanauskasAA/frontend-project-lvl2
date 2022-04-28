import { cwd } from 'process';
import _ from 'lodash';
import path from 'path';
import fs from 'fs';

export default (filepath1, filepath2) => {
  const file1 = JSON.parse(fs.readFileSync(path.resolve(cwd(), filepath1), 'utf8'));
  const file2 = JSON.parse(fs.readFileSync(path.resolve(cwd(), filepath2), 'utf8'));

  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.uniq([...keys1, ...keys2]).sort();

  const result = keys.reduce((acc, key) => {
    if (!keys2.includes(key)) {
      acc.push(`  - ${key}: ${file1[key]}`);
    } else if (!keys1.includes(key)) {
      acc.push(`  + ${key}: ${file2[key]}`);
    } else if (file1[key] === file2[key]) {
      acc.push(`    ${key}: ${file1[key]}`);
    } else {
      acc.push(`  - ${key}: ${file1[key]}`);
      acc.push(`  + ${key}: ${file2[key]}`);
    }

    return acc;
  }, []);

  return `{\n${result.join('\n')}\n}`;
};
