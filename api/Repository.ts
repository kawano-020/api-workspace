import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { GithubInfo } from '@/lib/githubInfo'

const githubInfo = new GithubInfo()

export class Repository {
  private readonly axios: NuxtAxiosInstance
  constructor($axios: NuxtAxiosInstance) {
    this.axios = $axios
  }

  list(): Promise<any> {
    return this.axios.$get(`${githubInfo.apiBaseURL}repos`)
  }
}
