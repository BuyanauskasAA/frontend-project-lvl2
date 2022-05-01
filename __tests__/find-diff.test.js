import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import findDiff from '../src/find-diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const jsonFilepath1 = getFixturePath('file1.json');
const jsonFilepath2 = getFixturePath('file2.json');

const yamlFilepath1 = getFixturePath('file1.yml');
const yamlFilepath2 = getFixturePath('file2.yaml');

const expectedFile = readFile('expected_file');

test('generate difference .json', () => {
  expect(findDiff(jsonFilepath1, jsonFilepath2)).toEqual(expectedFile);
});

test('generate difference .yaml', () => {
  expect(findDiff(yamlFilepath1, yamlFilepath2)).toEqual(expectedFile);
});
