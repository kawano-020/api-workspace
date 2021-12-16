import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { GithubInfo } from '@/utils/githubInfo'

export type UserResponse = {
  login: string
  name: string
  avatarUrl: string
  location: string
  publicRepos: number
  createdAt: string
}

const githubInfo = new GithubInfo()

export class User {
  private readonly axios: NuxtAxiosInstance
  constructor($axios: NuxtAxiosInstance) {
    this.axios = $axios
  }

  retrieve(): Promise<UserResponse> {
    return this.axios.$get(
      `${githubInfo.apiOrigin}users/${githubInfo.userName}`
    )
  }
}
