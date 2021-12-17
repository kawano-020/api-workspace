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

export type GithubRepository = {
  id: string
  name: string
}

export type RepositoryResponse = {
  items: GithubRepository[]
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

  repositories(
    containsName: string,
    orderByUpdated: boolean
  ): Promise<RepositoryResponse> {
    const nameQuery = containsName ? `${containsName}+in:name` : ''
    const userQuery = `user:${githubInfo.userName}`
    const query = [nameQuery, userQuery]
      .filter((element: string) => element)
      .join('+')
    const url = `${
      githubInfo.searchBaseURL
    }repositories?q=${query}&per_page=100${
      orderByUpdated ? '&sort=updated' : ''
    }`
    return this.axios.$get(url)
  }
}
