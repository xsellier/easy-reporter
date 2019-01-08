const levels = [] //['debug', 'info', 'log', 'warn', 'error']

let _service = ''

const reference = {}

/**
 * Instantiable context-aware logging utility
 * @param {string} route - Route within which logging happens
 */
class Logger {
  constructor (route) {
    levels.forEach(
      (level) => {
        this[level] = (message) => {
          output(level, route)(message)
        }
      }
    )
  }
}

function output (level) {
  return (message) => {
    const err = message instanceof Error
      ? message
      : null

    message = err
      ? level === 'error' ? err.stack : err.toString()
      : message

    reference[level](`${new Date().toTimeString()} [${level.toUpperCase().padEnd(8, ' ')}] ${message}`)
  }
}

/**
 * Override console methods for necessary formatting and establish reference to core console methods
 * @param {string} options - The logger's option
 * @returns {function} The context-aware Logger class
 */
module.exports = (options) => {
  if (!_service) {
    _service = options.namespace
    levels.forEach(
      (level) => {
        // Establish reference to core console methods
        reference[level] = console[level]

        // Override console methods for necessary formatting
        console[level] = output(level)
      }
    )
  }

  return Promise.resolve(['logger', Logger])
}
