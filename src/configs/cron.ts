import cron, { ScheduledTask } from 'node-cron'

import { logger } from './logger'

// https://github.com/node-cron/node-cron/blob/master/README.md
const runEverySecond: ScheduledTask = cron.schedule(
  '* * * * * *',
  () => {
    logger.info('I run every second')
  },
  {
    scheduled: false, // true to activate
  },
)

export { runEverySecond }
