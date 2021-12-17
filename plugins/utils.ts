import { defineNuxtPlugin } from '@nuxtjs/composition-api'

const zeroPadding = (value: number): string => {
  return ('00' + value).slice(-2)
}

const formatedIsoDateString = (isoDateString: string): string => {
  const dateObj = new Date(isoDateString)
  const year = dateObj.getFullYear()
  const month = zeroPadding(dateObj.getMonth() + 1)
  const date = zeroPadding(dateObj.getDate())
  const hour = zeroPadding(dateObj.getHours())
  const minute = zeroPadding(dateObj.getMinutes())
  return `${year}/${month}/${date} ${hour}:${minute}`
}

declare module '@nuxt/types' {
  interface Context {
    $formatedIsoDateString: (isoDateString: string) => string
  }
}

export default defineNuxtPlugin((_, inject) => {
  inject('formatedIsoDateString', formatedIsoDateString)
})
