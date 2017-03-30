'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const chalk = require('chalk');
const validators = require('../generators/app/validators');

describe('generator-module:app', function () {
  describe('module mode', function () {
    beforeAll(function () {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          name: 'Hello',
          gaid: 'UA-XXXX'
        })
        .toPromise();
    });

    it('creates files', function () {
      assert.file([
        'src/index.ts',
        'test/index.ts',
        '.vscode/tasks.json',
        '.editorconfig',
        '.gitignore',
        'LICENSE',
        'package.json',
        'Readme.md',
        '.travis.yml',
        'tsconfig.json',
        'tslint.json',
        '.npmignore'
      ]);
    });
  });
  describe('core mode', function () {
    beforeAll(function () {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          category: 'core'
        })
        .toPromise();
    });

    it('creates files', function () {
      assert.file([
        'src/index.ts',
        'test/index.ts',
        '.vscode/tasks.json',
        '.editorconfig',
        '.gitignore',
        'LICENSE',
        'package.json',
        'Readme.md',
        '.travis.yml',
        'tsconfig.json',
        'tslint.json',
        '.npmignore',
        'Dockerfile',
        'config/development.json'
      ]);
    });
  });
});

describe('validators', () => {
  describe('→ category', () => {
    it('should accept "core"', () => {
      assert.equal(validators.category('core'), true);
    });
    it('should accept "new_module"', () => {
      assert.equal(validators.category('core'), true);
    });
    it('should fail cause category is undefined', () => {
      assert.equal(validators.category(), chalk.red('No valid generator category.'));
    });
    it('should fail cause category is anything else', () => {
      assert.equal(validators.category('core module'), chalk.red('No valid generator category.'));
    });
  });
  describe('→ name', () => {
    it('should accept a leading slash', () => {
      assert.equal(validators.name('testname'), true);
    });
    it('should fail cause name is undefined', () => {
      assert.equal(validators.name(), chalk.red('A module name is needed'));
    });
    it('should fail cause string is not long enough', () => {
      assert.equal(validators.name(''), chalk.red('A module name is needed'));
    });
  });
});
