function errorHandler(error, req, res, next) {
  const errStatus = error.status || 500;
  const errMessage = error.message || "Internal Server Error";
  res.status(errStatus).json({
    error: errMessage,
  });
}

export default errorHandler;
