class CMSErrorHandler {
  private _errors: string[] = []
  private async onSubmit(errors: string[]) {}

  constructor(onSubmitFn?: (errors: string[]) => any) {
    if (onSubmitFn) this.onSubmit = onSubmitFn
  }

  addError(...errorDetails: string[]): void {
    this._errors.push(...errorDetails)
  }

  async submitReport() {
    if (this._errors.length > 0) {
      await this.onSubmit(this._errors)
      this._errors = []
    }
  }
}

/*
 * Use this object to collect and report errors of CMS related operations.
 *
 * Import this object as a singleton, instead of instantiating a new CMSErrorHandler object everytime.
 *
 * Customize what to do with the error report here (for example, push to a logs service).
 * */
export const cmsErrorHandler = new CMSErrorHandler((errors) => {
  console.error(errors)
})

/**
 * Wrap a function that returns a promise to catch errors and adds them to the cmsErrorHandler
 */
export const handlePromiseError = async <T>(fn: () => Promise<T>) => {
  try {
    return await fn()
  } catch (e: unknown) {
    cmsErrorHandler.addError(e as string)
  }
}
