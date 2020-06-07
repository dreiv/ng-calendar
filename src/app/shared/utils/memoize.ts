/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// eslint-disable-next-line @typescript-eslint/ban-types
export const memoize = (fn): Function => {
  const cache = {};

  return (...args) => {
    const cacheKey = JSON.stringify(args);

    if (cacheKey in cache) {
      return cache[cacheKey];
    }

    return (cache[cacheKey] = fn(...args));
  };
};
