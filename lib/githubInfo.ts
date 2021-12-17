export class GithubInfo {
  private _userName: string
  constructor() {
    this._userName = 'kawano-020'
  }

  get userName(): string {
    return this._userName
  }

  get repositoryName(): string {
    return 'workspace'
  }

  get apiOrigin(): string {
    return `https://api.github.com/`
  }

  get baseURL(): string {
    return `${this.apiOrigin}users/${this.userName}/`
  }

  get searchBaseURL(): string {
    return `${this.apiOrigin}search/`
  }
}
