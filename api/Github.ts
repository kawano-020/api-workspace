import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { GithubInfo } from '@/lib/githubInfo'

const githubInfo = new GithubInfo()

export type GithubUser = {
  login: string
  name: string
  avatarUrl: string
  location: string
  publicRepos: number
  createdAt: string
}

export class Github {
  private readonly axios: NuxtAxiosInstance
  constructor($axios: NuxtAxiosInstance) {
    this.axios = $axios
  }

  user(): Promise<GithubUser> {
    return this.axios.$get(
      `${githubInfo.apiOrigin}users/${githubInfo.userName}`
    )
  }

  repositories(): Promise<any> {
    return this.axios.$get(
      `${githubInfo.apiBaseURL}users/${githubInfo.userName}/repos`
    )
  }
}
