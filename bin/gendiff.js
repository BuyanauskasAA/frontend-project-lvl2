#!/usr/bin/env node

import { program } from 'commander';
import findDiff from '../src/find-diff.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const diff = findDiff(filepath1, filepath2, options.format);
    console.log(diff);
  })
  .parse();
