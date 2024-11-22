const helloCommand = require('./hello');
const helpCommand = require('./help');
const santaStartCommand = require('./santaStart');

const commands = {
  hello: helloCommand,
  help: helpCommand,
  santaStart: santaStartCommand
};

module.exports = commands;
