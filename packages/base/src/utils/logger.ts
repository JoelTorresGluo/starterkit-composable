type LoggerInterface = Pick<Console, 'log' | 'error'>

/**
 * This is a sample logger class. Uses console by default.
 * Customize it to use any third-party service instead.
 */
export class Logger {
  private client: LoggerInterface = console

  constructor(initClient?: () => LoggerInterface) {
    if (initClient) {
      this.client = initClient()
    }
  }

  log(message: string) {
    this.client.log(message)
  }

  error(error: Error | string) {
    this.client.error(typeof error === 'string' ? error : error.message)
  }

  sendErrorToLogSink(opts: any) {
    //implement your log sink here
    return
  }
}
