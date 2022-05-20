import { test, expect, describe } from '@jest/globals';
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

const expectedFileStylish = readFile('expected-file.stylish-format');
const expectedFilePlain = readFile('expected-file.plain-format');
const expectedFileJson = readFile('expected-file.json');

describe("'stylish' output format", () => {
  test('generate difference .json', () => {
    expect(findDiff(jsonFilepath1, jsonFilepath2, 'stylish')).toEqual(expectedFileStylish);
  });
  test('generate difference .yaml', () => {
    expect(findDiff(yamlFilepath1, yamlFilepath2, 'stylish')).toEqual(expectedFileStylish);
  });
});

describe("'plain' output format", () => {
  test('generate difference .json', () => {
    expect(findDiff(jsonFilepath1, jsonFilepath2, 'plain')).toEqual(expectedFilePlain);
  });
  test('generate difference .yaml', () => {
    expect(findDiff(yamlFilepath1, yamlFilepath2, 'plain')).toEqual(expectedFilePlain);
  });
});

describe("'json' output format", () => {
  test('generate difference .json', () => {
    expect(findDiff(jsonFilepath1, jsonFilepath2, 'json')).toEqual(expectedFileJson);
  });
  test('generate difference .yaml', () => {
    expect(findDiff(yamlFilepath1, yamlFilepath2, 'json')).toEqual(expectedFileJson);
  });
});

describe('default output format', () => {
  test('generate difference .json', () => {
    expect(findDiff(jsonFilepath1, jsonFilepath2)).toEqual(expectedFileStylish);
  });
  test('generate difference .yaml', () => {
    expect(findDiff(yamlFilepath1, yamlFilepath2)).toEqual(expectedFileStylish);
  });
});
