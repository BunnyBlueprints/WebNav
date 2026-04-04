export function notFoundHandler(_req, res) {
  return res.status(404).json({ message: 'Route not found.' });
}

export function errorHandler(error, _req, res, _next) {
  const statusCode = error.statusCode ?? error.status ?? 500;
  const message = error.message ?? 'Something went wrong.';

  console.error(`[${statusCode}] Error:`, message, error);

  if (res.headersSent) {
    return;
  }

  return res.status(statusCode).json({
    message,
  });
}
