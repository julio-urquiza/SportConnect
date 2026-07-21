import asyncHandler from './asyncHandler.js'
export default function wrapRoutes(controller) {
  const wrapped = {};

  for (const key in controller) {
    wrapped[key] = asyncHandler(controller[key]);
  }

  return wrapped;
}