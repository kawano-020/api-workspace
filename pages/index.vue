<template>
  <BaseContainer>
    <h1>{{ 'Welcome to WorkSpace' }}</h1>
    <img
      src="https://github-readme-stats.vercel.app/api/pin/?username=kawano-020&repo=api-workspace&show_owner=true&show_icons=true"
    />
    <div v-if="state.userInfo">
      <v-img width="300" :src="state.userInfo.avatarUrl" />
      <h2>{{ `Name: ${state.userInfo.name}` }}</h2>
      <h3>{{ `Registration date: ${new Date(state.userInfo.createdAt)}` }}</h3>
      <h3>{{ `Location: ${state.userInfo.location}` }}</h3>
    </div>
  </BaseContainer>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  useContext,
} from '@nuxtjs/composition-api'
import BaseContainer from '@/components/BaseContainer.vue'
import { UserResponse } from '~/api/User'

type State = {
  userInfo: UserResponse | null
}

export default defineComponent({
  components: {
    BaseContainer,
  },
  setup() {
    const { $repositories } = useContext()
    const state = reactive<State>({
      userInfo: null,
    })

    onMounted(async () => {
      state.userInfo = await $repositories.user.retrieve()
    })

    return {
      state,
    }
  },
})
</script>
