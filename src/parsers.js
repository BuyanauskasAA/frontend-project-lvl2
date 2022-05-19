import path from 'path';
import fs from 'fs';
import { cwd } from 'process';
import yaml from 'js-yaml';

export default (filepath) => {
  const format = path.extname(filepath);

  switch (format) {
    case '.json':
      return JSON.parse(fs.readFileSync(path.resolve(cwd(), filepath), 'utf-8'));
    case '.yaml':
    case '.yml':
      return yaml.load(fs.readFileSync(path.resolve(cwd(), filepath), 'utf-8'));
    default:
      return null;
  }
};
