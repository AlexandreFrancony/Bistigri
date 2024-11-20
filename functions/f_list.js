const helloCommand = require('./hello');
const helpCommand = require('./help');

const commands = {
  hello: helloCommand,
  help: helpCommand
};

module.exports = commands;
