import { ApiError } from '../utils/api-error.js';

export const errHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  }
  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    errors: [err.message],
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
