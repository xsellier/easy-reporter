const dbMigrate = require('db-migrate')
const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()

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
   * Establish a connection pool to the database and run migrations
   * @param {Object} options - Database configuration
   * @returns {Promise}
   */
  constructor (options) {
    const dbCfgFile = `${process.cwd()}/.data/database.json`
    const dbConfig = {
      defaultEnv: 'options',
      options: {
        driver: options.driver,
        filename: `${process.cwd()}/.data/sqlite.db`,
        username: options.username,
        password: options.password
      }
    }
    fs.writeFileSync(dbCfgFile, JSON.stringify(dbConfig, null, 2))

    // In the case of a connection problem, db-migrate crashes the process
    this._initPromise = dbMigrate.getInstance(true, { config: dbCfgFile })
      .up()
      .then(() => {
        return new Promise((resolve, reject) => {
          this.db = new sqlite3.Database(dbConfig.options.filename, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
              return reject(err)
            }

            console.info(`Connected to ${dbConfig.options.filename}`)
            return resolve(this.db)
          })
        })
      })
  }

  /**
   * Query the database
   * @param {string} query - The prepared SQL query
   * @param {*[]} [params] - The list of params to bind to the prepared SQL query
   * @returns {Promise<Object>} The query result
   */
  query (query, params) {
    return new Promise((resolve, reject) => {
      return this.db.all(query, params, (err, rows) => {
        if (err) {
          return reject(err)
        }

        return resolve(rows)
      })
    })
  }
}

module.exports = initializer
