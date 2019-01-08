const pg = require('pg')
const dbMigrate = require('db-migrate')

function initializer (options) {
  const database = new DatabaseResource(options)
  return database.initPromise
    .then(() => ['database', database])
}

class DatabaseResource {
  /**
   * The initialization promise
   * @type {Promise<void>}
   */
  get initPromise () {
    return this._initPromise
  }

  /**
   * Indicator whether the database connection pool is healthy
   * @type {boolean}
   */
  get isHealthy () {
    // Healthy threshold cannot be higher than 1 because pg-pool only creates new clients
    // on demand after a database downtime
    return this.poolSize > 0
  }

  /**
   * The number of connected clients as reported by pg pool
   * @type {number}
   */
  get poolSize () {
    return this.pgPool.pool.availableObjectsCount() + this.pgPool.pool.inUseObjectsCount()
  }

  /**
   * Establish a connection pool to the database and run migrations
   * @param {Object} options - Database configuration
   * @returns {Promise}
   */
  constructor (options) {
    const dbConfig = {
      config: {
        defaultEnv: 'options',
        options
      }
    }

    this.pgPool = new pg.Pool(options)

    this.pgPool.on('error', (err) => {
      if (err.client) {
        const level = this.isHealthy ? 'warn' : 'error'
        const details = {
          isHealthy: this.isHealthy,
          poolSize: this.poolSize
        }
        console[level]('Connection lost', details, err)
      } else {
        console.error('Server error', 'Database connection error', err)
      }
    })

    this.pgPool.on('connect', () => {
      console.info(`Database connection created, pool size incremented to ${this.poolSize + 1}`)
    })

    // In the case of a connection problem, db-migrate crashes the process
    this._initPromise = dbMigrate.getInstance(true, dbConfig)
      .up()
  }

  /**
   * Query the database
   * @param {string} query - The prepared SQL query
   * @param {*[]} [params] - The list of params to bind to the prepared SQL query
   * @returns {Promise<Object>} The query result
   */
  query (query, params) {
    return this.initPromise
      .then(() => this.pgPool.query(query, params))
  }
}

module.exports = initializer
