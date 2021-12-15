import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { Repository } from '@/api/Repository'
import { User } from '@/api/User'

interface Repositories {
  repository: Repository
  user: User
}

declare module '@nuxt/types' {
  interface Context {
    $repositories: Repositories
  }
}

export default defineNuxtPlugin(({ $axios }, inject) => {
  const repository = new Repository($axios)
  const user = new User($axios)
  const $repositories = {
    repository,
    user,
  }
  inject('repositories', $repositories)
})
