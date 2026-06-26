import rateLimit from 'express-rate-limit';

const authOperationNames = ['loginUser', 'registerUser', 'LoginUser', 'RegisterUser'];

function isAuthOperation(req) {
  const operationName = String(req.body?.operationName || '');
  const query = String(req.body?.query || '');

  return authOperationNames.some(
    (operation) => operationName.includes(operation) || query.includes(operation)
  );
}

export const authGraphqlRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => !isAuthOperation(req),
  message: {
    error: 'Too many authentication attempts. Please try again later.',
  },
});
