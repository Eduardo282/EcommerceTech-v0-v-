export function errorMiddleware(error, _req, res, _next) {
  void _next;
  console.error(error);

  const statusCode = error.statusCode ?? 500;
  res.status(statusCode).json({
    error: statusCode === 500 ? 'Internal server error' : error.message,
  });
}
