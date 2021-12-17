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
  description: string | null
  createdAt: string
  pushedAt: string
}

export type GithubCommitter = {
  name: string
  date: string
}

export type GithubCommit = {
  committer: GithubUser
  message: string
}

export type RepositoriesResponse = {
  items: GithubRepository[]
}

export type CommitsResponse = {
  sha: string
  commit: GithubCommit
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
  ): Promise<RepositoriesResponse> {
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

  repository(repositoryName: string): Promise<RepositoriesResponse> {
    return this.axios.$get(
      `${githubInfo.searchBaseURL}repositories` +
        `?q=${repositoryName}+in:name+user:${githubInfo.userName}`
    )
  }

  repositoryLanguages(repositoryName: string): Promise<any> {
    return this.axios.$get(
      `${githubInfo.apiOrigin}repos/${githubInfo.userName}/` +
        `${repositoryName}/languages`
    )
  }

  recentCommits(repositoryName: string): Promise<CommitsResponse[]> {
    return this.axios.$get(
      `${githubInfo.apiOrigin}repos/${githubInfo.userName}/` +
        `${repositoryName}/commits`,
      { params: { per_page: 10 } }
    )
  }
}
