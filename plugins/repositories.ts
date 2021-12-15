import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { Repository } from '@/api/Repository'

interface Repositories {
  repository: Repository
}

declare module '@nuxt/types' {
  interface Context {
    $repositories: Repositories
  }
}

export default defineNuxtPlugin(({ $axios }, inject) => {
  const repository = new Repository($axios)
  const $repositories = {
    repository,
  }
  inject('repositories', $repositories)
})
