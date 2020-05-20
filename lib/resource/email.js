const mailgun = require("mailgun-js")

class ResourceEmail {
  constructor (rawOptions) {
    rawOptions = rawOptions || {}

    if (!rawOptions.domain || !rawOptions.apiKey || !rawOptions.to) {
      throw new Error('Invalid email configuration')
    }

    this.options = rawOptions
    this.mailgun = mailgun(this.options)
  }

  send (subject, text) {
    const emailData = {
      from: `Mailgun Sandbox <postmaster@${this.options.domain}>`,
      to: this.options.to,
      subject,
      text
    }

    return this.mailgun.messages().send(emailData, (err, body) => {
      if (err != null) {
        console.error(err)
      }
    })
  }

}

module.exports = (options) => Promise.resolve(['email', new ResourceEmail(options)])
