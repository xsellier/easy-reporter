const nodemailer = require('nodemailer')

class ResourceEmail {
  constructor (rawOptions) {
    rawOptions = rawOptions || {}

    if (!rawOptions.configuration || !rawOptions.to_address || !rawOptions.from_address) {
      throw new Error('Invalid email configuration')
    }

    this.options = rawOptions
    this.transporter = nodemailer.createTransport({
      host: this.options.configuration.host,
      port: this.options.configuration.port,
      secure: this.options.configuration.secure,
      auth: {
        user: this.options.configuration.auth.user,
        pass: this.options.configuration.auth.pass
      }
    })
  }

  send (toEmail, subject, text) {
    const emailData = {
      from: `Easy Reporter <${this.options.from_address}>`,
      to: toEmail,
      subject,
      text
    }

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(emailData, (error, info) => {
        if (error) {
          return reject(error)
        }

        return resolve(info.response)
      })
    })
  }
}

module.exports = (options) => Promise.resolve(['email', new ResourceEmail(options)])
