'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-module:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: true,
        gaid: true
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
