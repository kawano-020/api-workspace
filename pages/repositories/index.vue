<template>
  <BaseContainer>
    <v-sheet :elevation="3" class="pa-2">
      <v-form class="mt-5 d-flex">
        <v-text-field
          v-model="state.search.name"
          class="mx-2"
          label="Repository Name"
          prepend-inner-icon="mdi-magnify"
          outlined
          @input="watchSearchInput"
        ></v-text-field>
        <v-checkbox
          v-model="state.search.orderByUpdated"
          class="mx-2"
          label="Last Updated"
          append-icon="mdi-sort-clock-ascending-outline"
          @change="watchSearchInput"
        ></v-checkbox>
      </v-form>
      <v-divider />
      <v-progress-linear :active="state.isFetching" :height="5" indeterminate />
      <div
        class="mt-6 d-flex flex-wrap justify-space-around align-center"
        :class="state.repos.length % 2 !== 0 ? 'odd' : ''"
      >
        <p v-for="repo in state.repos" :key="repo.id">
          <v-img
            contain
            :max-width="370"
            :max-height="130"
            :src="$getRepoStatImageUrl(isDark, '', repo.name)"
          />
        </p>
      </div>
      <div v-if="state.errorMessage" class="mb-4 d-flex justify-center">
        <v-icon :size="50" left>mdi-alert-rhombus-outline</v-icon>
        <h1>
          {{ state.errorMessage }}
        </h1>
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
  search: {
    name: string
    orderByUpdated: boolean
  }
  timeoutId: NodeJS.Timeout | null
  isFetching: boolean
  errorMessage: string
}

export default defineComponent({
  setup() {
    const { $repositories, $vuetify } = useContext()
    const state = reactive<State>({
      repos: [],
      search: {
        name: '',
        orderByUpdated: false,
      },
      timeoutId: null,
      isFetching: true,
      errorMessage: '',
    })

    const readyForFetch = (): void => {
      state.errorMessage = ''
      state.isFetching = true
    }

    const watchSearchInput = (): void => {
      readyForFetch()
      if (state.timeoutId) {
        clearTimeout(Number(state.timeoutId))
      }
      state.timeoutId = setTimeout(() => {
        fetchRepositories()
      }, 1000)
    }

    const fetchRepositories = async (): Promise<void> => {
      try {
        const response = await $repositories.github.repositories(
          state.search.name,
          state.search.orderByUpdated
        )
        state.repos = response.items
        if (state.repos.length === 0) {
          state.errorMessage = 'Not found any Repositories.'
        }
      } catch {
        state.repos = []
        state.errorMessage = 'Failed to get Repositories.'
      }
      state.isFetching = false
    }

    onMounted(() => {
      fetchRepositories()
    })

    const isDark = computed(() => {
      return $vuetify.theme.dark
    })

    return {
      state,
      isDark,
      watchSearchInput,
    }
  },
})
</script>

<style lang="scss" scoped>
.odd::after {
  display: block;
  content: '';
  width: 370px;
  height: 130px;
}
</style>
