const helloCommand = require('./hello');
const helpCommand = require('./help');
const santaCommand = require('./santa');

const commands = {
  hello: helloCommand,
  help: helpCommand,
  santa: santaCommand
};

module.exports = commands;
