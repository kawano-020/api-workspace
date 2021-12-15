export class GithubInfo {
  private _userName: string
  constructor() {
    this._userName = 'kawano-020'
  }

  get userName(): string {
    return this._userName
  }

  get apiOrigin(): string {
    return `https://api.github.com/users/${this.userName}/`
  }
}
