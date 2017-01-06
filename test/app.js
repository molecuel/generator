'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const chalk = require('chalk');
const validators = require('../generators/app/validators');

describe('generator-module:app', function () {
  before(function () {
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
      'tasks/gulpclass.ts',
      'test/index.ts',
      '.vscode/tasks.json',
      '.editorconfig',
      '.gitignore',
      'gulpfile.ts',
      'LICENSE',
      'package.json',
      'Readme.md',
      '.travis.yml',
      'tsconfig.json',
      'tslint.json'
    ]);
  });
});

describe('validators', () => {
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
