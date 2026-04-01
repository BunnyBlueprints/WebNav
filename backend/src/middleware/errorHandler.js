export function notFoundHandler(_req, res) {
  return res.status(404).json({ message: 'Route not found.' });
}

export function errorHandler(error, _req, res, _next) {
  console.error(error);

  return res.status(error.statusCode ?? 500).json({
    message: error.message ?? 'Something went wrong.',
  });
}
