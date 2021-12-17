<template>
  <BaseContainer>
    <v-sheet :elevation="3" class="pa-2">
      <div class="mt-4 d-flex flex-wrap justify-space-around align-center">
        <p v-for="repo in state.repos" :key="repo.id">
          <v-img
            contain
            :max-width="350"
            :max-height="120"
            :src="$getRepoStatImageUrl(isDark, '', repo.name)"
          />
        </p>
      </div>
    </v-sheet>
  </BaseContainer>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  useContext,
} from '@nuxtjs/composition-api'
import { GithubRepository } from '~/api/Github'

type State = {
  repos: GithubRepository[]
}

export default defineComponent({
  setup() {
    const { $repositories, $vuetify } = useContext()
    const state = reactive<State>({
      repos: [],
    })

    onMounted(async () => {
      const repos = await $repositories.github.repositories()
      state.repos = repos
    })

    const isDark = computed(() => {
      return $vuetify.theme.dark
    })

    return {
      state,
      isDark,
    }
  },
})
</script>
