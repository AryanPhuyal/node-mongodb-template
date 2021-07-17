require("dotenv").config();
const app = require("./config/http");
const { PORT, IsProd } = require("./config/env");
const logger = require("./config/logger");
const database = require("./config/database");
const { init } = require("./controllers/siteSetup");

const appInit = async () => {
  try {
    await database().then((data) => {
      init();
    });
    // setup site
    IsProd
      ? console.log(`Database connected`)
      : logger.emit("log", "database.js", __dirname, "Database connected");
    app.listen(PORT, (err) => {
      if (!err)
        IsProd
          ? console.log(`Server is listining at port ${PORT}`)
          : logger.emit(
              "log",
              "server.js",
              "server",
              `Server is lisining at port ${PORT}`
            );
      else
        IsProd
          ? console.log(
              `Unable to start server please check your configuration`
            )
          : logger.emit("log", "server.js", "server", `${err}`);
    });
  } catch (err) {
    IsProd
      ? console.error(`Unable to connect to database`)
      : logger.emit(
          "error",
          "database.js",
          __dirname,
          `Unable to connect to database,${err} `
        );
  }
};
appInit();
