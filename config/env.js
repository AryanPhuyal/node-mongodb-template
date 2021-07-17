const PORT = process.env.PORT || 4000;
const ENVIRONMENT = process.env.ENVIRONMENT || "DEVLOPMENT";
const MONGO_NAME = process.env.DATABASE_NAME;
const MONGO_PASSWORD = process.env.DATABASE_PASSWORD;
const MONGO_USER = process.env.DATABASE_USER;
const MONGO_PORT = process.env.DATABASE_PORT;
const MONGO_HOST = process.env.DATABASE_HOST;
const MONGO_URI =
  process.env.MONGO_URI ||
  `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}?authSource=admin`;
const IsProd = ENVIRONMENT === "PRODUCTION";
module.exports = {
  PORT,
  ENVIRONMENT,
  MONGO_URI,
  IsProd,
};
