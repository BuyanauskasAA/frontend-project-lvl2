import path from 'path';
import fs from 'fs';
import { cwd } from 'process';
import yaml from 'js-yaml';

export default (filepath) => {
  const format = path.extname(filepath);
  let file;

  if (format === '.json') {
    file = JSON.parse(fs.readFileSync(path.resolve(cwd(), filepath), 'utf-8'));
  }
  if (format === '.yml' || format === '.yaml') {
    file = yaml.load(fs.readFileSync(path.resolve(cwd(), filepath), 'utf-8'));
  }

  return file;
};
