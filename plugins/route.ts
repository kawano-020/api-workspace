import { defineNuxtPlugin } from '@nuxtjs/composition-api'

export type Route = {
  title: string
  pathName: string
  description: string
}

const home: Route = { title: 'Home', pathName: 'index', description: '' }
const repository: Route = {
  title: 'Repositories',
  pathName: 'repositories',
  description: 'Public Repositoryの一覧・詳細',
}
const apiDocument: Route = {
  title: 'API Document',
  pathName: 'api-doc',
  description: 'WebAPIの開発に使用するAPI仕様書',
}
const dbDocument: Route = {
  title: 'DB Document',
  pathName: 'db-doc',
  description: 'WebAPIの開発に使用するDB仕様書',
}

export const routes: Route[] = [home, repository, apiDocument, dbDocument]

const getFilteredRoutes = (excludeRouteNames: string[]): Route[] => {
  return routes.filter((element) => {
    return !excludeRouteNames.includes(element.pathName)
  })
}

declare module '@nuxt/types' {
  interface Context {
    $getFilteredRoutes: (excludeRouteNames: string[]) => Route[]
  }
}

export default defineNuxtPlugin((_, inject) => {
  inject('getFilteredRoutes', getFilteredRoutes)
})
