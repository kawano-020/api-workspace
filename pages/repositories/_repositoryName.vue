<template>
  <BaseContainer>
    <v-sheet class="pa-4" :elevation="3">
      <div v-if="state.repo">
        <!-- Repository Detail -->
        <div class="mb-4 d-flex justify-space-around align-center">
          <p><v-img :src="repoStatImageUrl" /></p>
          <RepositoryDetail :repo="state.repo" />
        </div>
        <v-divider />
        <v-card class="mt-4" outlined>
          <!-- Recent Commits -->
          <div class="d-flex justify-center">
            <v-icon large>mdi-source-commit-start</v-icon>
            <div>
              <v-card-title v-text="'Recent Commit(s)'" />
              <v-card-subtitle v-text="'Show latest 10 commit(s).'" />
            </div>
          </div>
          <v-divider />
          <v-list>
            <!-- Commit -->
            <div
              v-for="(commit, index) in state.recentCommits"
              :key="commit.id"
            >
              <v-list-item>
                <v-icon large>mdi-source-commit</v-icon>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title v-text="commit.message" />
                  </v-list-item-content>
                  <v-subheader v-text="commit.committer.name" />
                  <v-subheader
                    v-text="$formatedIsoDateString(commit.committer.date)"
                  />
                </v-list-item>
              </v-list-item>
              <v-divider v-if="index < state.recentCommits.length - 1" />
            </div>
          </v-list>
        </v-card>
      </div>
      <ErrorMessage :error-message="state.errorMessage" />
    </v-sheet>
  </BaseContainer>
</template>

<script lang="ts">
import { useContext, useRoute } from '@nuxtjs/composition-api'
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
} from '@vue/composition-api'
import { CommitsResponse, GithubCommit, GithubRepository } from '@/api/Github'
import BaseContainer from '@/components/BaseContainer.vue'
import RepositoryDetail from '@/components/RepositoryDetail.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

type GithubCommitWithSha = GithubCommit & {
  sha: string
}

type State = {
  repo: GithubRepository | null
  recentCommits: GithubCommitWithSha[]
  errorMessage: string
}

export default defineComponent({
  components: {
    BaseContainer,
    ErrorMessage,
    RepositoryDetail,
  },
  setup() {
    const { $getRepoStatImageUrl, $repositories, $vuetify } = useContext()
    const route = useRoute()
    const repoName = route.value.params.repositoryName
    const state = reactive<State>({
      repo: null,
      recentCommits: [],
      errorMessage: '',
    })

    const fetchRepository = async (): Promise<void> => {
      try {
        const response = await $repositories.github.repository(repoName)
        state.repo = response.items.find((element: GithubRepository) => {
          return element.name === repoName
        })!
      } catch {
        state.errorMessage = 'Failed to fetch Repository.'
      }
    }

    const fetchRecentCommits = async (): Promise<void> => {
      const response = await $repositories.github.recentCommits(repoName)
      state.recentCommits = response.map((element: CommitsResponse) => {
        return { sha: element.sha, ...element.commit }
      })
    }

    const repoStatImageUrl = computed(() => {
      const isDark = $vuetify.theme.dark
      return $getRepoStatImageUrl(isDark, '', repoName)
    })

    onMounted(async () => {
      await fetchRepository()
      await fetchRecentCommits()
    })

    return {
      state,
      repoStatImageUrl,
    }
  },
})
</script>
