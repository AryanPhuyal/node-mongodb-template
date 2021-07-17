class ServerError extends Error {
  constructor(err, data = null) {
    super(err);
    this.data = data;
  }
}

module.exports = ServerError;
