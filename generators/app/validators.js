const chalk = require('chalk');
const validators = {};

validators.name = function (value) {
  let returnValue;
  if (!value || value.length < 1) {
    returnValue = chalk.red('A module name is needed');
  } else {
    returnValue = true;
  }
  return returnValue;
};

module.exports = validators;
