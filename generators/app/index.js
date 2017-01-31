'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const validators = require('./validators');

module.exports = Generator.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Molecuel module') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'category',
      message: 'Do you want to generate a new module or get the core?',
      default: 'new_module',
      validate: validators.category
    }, {
      when: function (response) {
        return response.category === 'new_module';
      },
      type: 'input',
      name: 'name',
      message: 'What should be the name of your module?',
      default: 'mymodule',
      validate: validators.name
    }, {
      type: 'input',
      name: 'gaid',
      message: 'Do you have a google analytics ID for the Documentation?',
      default: 'UA-XXXX'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    if (this.props.category === 'core') {
      this.props.name = '@molecuel/core';
    }
    this.destinationRoot(this.props.name);
    if (this.props.category === 'core') {
      this.props.name = '@molecuel/core';
      this.fs.copy(
        this.templatePath('_config/_development.json'),
        this.destinationPath('config/development.json')
      );
      this.fs.copy(
        this.templatePath('_Dockerfile'),
        this.destinationPath('Dockerfile')
      );
    }
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.name
      }
    );
    this.fs.copy(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('_npmignore'),
      this.destinationPath('.npmignore')
    );
    this.fs.copy(
      this.templatePath('_gulpfile.ts'),
      this.destinationPath('gulpfile.ts')
    );
    this.fs.copyTpl(
      this.templatePath('_tasks/_gulpclass.ts'),
      this.destinationPath('tasks/gulpclass.ts'),
      {
        gaid: this.props.gaid
      }
    );
    this.fs.copy(
      this.templatePath('_test/_index.ts'),
      this.destinationPath('test/index.ts')
    );
    this.fs.copy(
      this.templatePath('_src/_index.ts'),
      this.destinationPath('src/index.ts')
    );
    this.fs.copy(
      this.templatePath('_vscode/_tasks.json'),
      this.destinationPath('.vscode/tasks.json')
    );
    this.fs.copy(
      this.templatePath('_editorconfig'),
      this.destinationPath('.editorconfig')
    );
    this.fs.copy(
      this.templatePath('_travis.yml'),
      this.destinationPath('.travis.yml')
    );
    this.fs.copyTpl(
      this.templatePath('_Readme.md'),
      this.destinationPath('Readme.md'),
      {
        name: this.props.name
      }
    );
    this.fs.copy(
      this.templatePath('_tslint.json'),
      this.destinationPath('tslint.json')
    );
    this.fs.copy(
      this.templatePath('_tsconfig.json'),
      this.destinationPath('tsconfig.json')
    );
    this.fs.copy(
      this.templatePath('_LICENSE'),
      this.destinationPath('LICENSE')
    );
  },

  install: function () {
    this.installDependencies({
      npm: false,
      yarn: true,
      bower: false
    });
  }
});
