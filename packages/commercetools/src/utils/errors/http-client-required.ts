export class HttpClientRequired extends Error {
  constructor() {
    super('httpClient is required')
  }
}
