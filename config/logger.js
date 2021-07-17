const EventEmitter = require("events");

const loggerEvent = new EventEmitter();
loggerEvent.on("log", (workspace, uri, message) => {
  console.log(`[${workspace}] [${uri}] [${message}]`);
});

loggerEvent.on("error", (workspace, uri, message) => {
  console.error(`[${workspace}] [${uri}] [${message}]`);
});

loggerEvent.on("debug", (workspace, uri, message) => {
  console.debug(`[${workspace}] [${uri}] [${message}]`);
});

module.exports = loggerEvent;
