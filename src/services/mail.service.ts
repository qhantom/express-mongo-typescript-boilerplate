import nodemailer, { TransportOptions } from 'nodemailer'

import { config, logger } from '../configs'

const transport = nodemailer.createTransport(config.mail as TransportOptions)

transport
  .verify()
  .then(() => logger.info('SMTP server connected'))
  .catch(() => logger.warn('Unable to connect to SMTP server'))

async function sendMail(
  to: string,
  subject: string,
  text: string,
): Promise<void> {
  const message = { from: config.mail.from, to, subject, text }
  await transport.sendMail(message)
}

// Test it out!
// sendMail('recipient@plate.dev', 'Hello there', 'A friendly mail')

export { transport, sendMail }
