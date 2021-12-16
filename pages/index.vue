<template>
  <BaseContainer>
    <img
      src="https://github-readme-stats.vercel.app/api/pin/?username=kawano-020&repo=api-workspace&show_owner=true&show_icons=true"
    />
    <UserCard v-if="state.userInfo" :user="state.userInfo" />
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
import UserCard from '@/components/UserCard.vue'

type State = {
  userInfo: UserResponse | null
}

export default defineComponent({
  components: {
    BaseContainer,
    UserCard,
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
