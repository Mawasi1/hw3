const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);
  res.json({
    message: err.message,
    request: {
      method: req.method,
      url: req.originalUrl,
    },
    timestamp: new Date().toISOString(),
    stack: err.stack,
  });
};

export { errorHandler };
