import { AxiosResponse } from 'axios'
import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import camelcaseKeys from 'camelcase-keys'

const convertedResponse = (response: any): AxiosResponse => {
  if (response.data) {
    response.data = camelcaseKeys(response.data, { deep: true })
    return response
  } else {
    return camelcaseKeys(response, { deep: true })
  }
}

export default defineNuxtPlugin(({ $axios }) => {
  $axios.onResponse((response: AxiosResponse) => {
    return convertedResponse(response)
  })
})
