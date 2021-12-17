import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { Github } from '@/api/Github'

interface Repositories {
  github: Github
}

declare module '@nuxt/types' {
  interface Context {
    $repositories: Repositories
  }
}

export default defineNuxtPlugin(({ $axios }, inject) => {
  const github = new Github($axios)
  const $repositories = {
    github,
  }
  inject('repositories', $repositories)
})
