
/**
 * Wraps an async function with error handling.
 * @param {Function} fn The function to wrap.
 * @returns {Function} A new function that executes the original function with error handling.
 */
export function withErrorHandling(fn) {
  return async function(...args) {
    try {
      return await fn(...args);
    } catch (error) {
      console.error('Ocurrió un error:', error.message);
      //process.exit(1); // Opcional: salir del proceso si ocurre un error crítico
    }
  };
}
