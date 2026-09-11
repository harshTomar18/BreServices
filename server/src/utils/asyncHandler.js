/**
 * Wrapper to eliminate repetitive try-catch blocks in route controllers
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
