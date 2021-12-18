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
          <!-- Readme -->
          <div v-if="state.readme">
            <div class="d-flex justify-center">
              <v-icon large>mdi-text-box-outline</v-icon>
              <v-card-title v-text="'README.md'" />
            </div>
            <v-divider />
            <v-sheet
              class="readme pa-4"
              :max-height="350"
              v-html="$md.render(state.readme)"
            />
          </div>
          <v-divider />
          <!-- Languages -->
          <div class="d-flex justify-center">
            <v-icon large>mdi-file-code-outline</v-icon>
            <v-card-title v-text="'Language(s)'" />
          </div>
          <v-divider />
          <v-list>
            <!-- Language Detail -->
            <div
              v-for="(language, index) in state.languages"
              :key="language.name"
            >
              <v-list-item>
                <v-icon
                  large
                  v-text="
                    languageThemes[language.name]
                      ? languageThemes[language.name].icon
                      : 'mdi-code-tags'
                  "
                />
                <v-list-item>
                  <v-list-item-title v-text="language.name" />
                  <v-subheader v-text="language.percentageString" />
                  <v-progress-linear
                    :value="language.percentage"
                    :color="
                      languageThemes[language.name]
                        ? languageThemes[language.name].color
                        : 'indigo darken-1'
                    "
                    :height="8"
                  />
                </v-list-item>
              </v-list-item>
              <v-divider v-if="index < state.languages.length - 1" />
            </div>
          </v-list>
          <v-divider />
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
import RepositoryDetail from '~/components/github/RepositoryDetail.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { languageThemes } from '@/lib/languageIcon'

type GithubCommitWithSha = GithubCommit & {
  sha: string
}

type State = {
  repo: GithubRepository | null
  languages: {
    name: string
    percentage: number
    percentageString: string
  }[]
  recentCommits: GithubCommitWithSha[]
  readme: string
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
      languages: [],
      recentCommits: [],
      readme: '',
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

    const fetchLanguages = async (): Promise<void> => {
      const response = await $repositories.github.repositoryLanguages(repoName)

      const values: number[] = Object.values(response)
      const totalBytes = values.reduce((sum, element) => {
        return sum + element
      }, 0)

      const formatedLanguages = []

      for (const language in response) {
        const percentage = (response[language] / totalBytes) * 100
        const langName = `${language[0].toUpperCase()}${language.slice(1)}`
        formatedLanguages.push({
          name: langName,
          percentage,
          percentageString: `${percentage.toFixed(1)}%`,
        })
      }

      state.languages = formatedLanguages
    }

    const fetchRecentCommits = async (): Promise<void> => {
      const response = await $repositories.github.recentCommits(repoName)
      state.recentCommits = response.map((element: CommitsResponse) => {
        return { sha: element.sha, ...element.commit }
      })
    }

    const fetchReadMe = async (): Promise<void> => {
      try {
        const response = await $repositories.github.readme(repoName)
        const readme = decodeURIComponent(escape(window.atob(response.content)))
        state.readme = readme
      } catch {}
    }

    const repoStatImageUrl = computed(() => {
      const isDark = $vuetify.theme.dark
      return $getRepoStatImageUrl(isDark, '', repoName)
    })

    onMounted(async () => {
      await fetchRepository()
      await fetchLanguages()
      await fetchRecentCommits()
      await fetchReadMe()
    })

    return {
      state,
      languageThemes,
      repoStatImageUrl,
    }
  },
})
</script>

<style lang="scss" scoped>
.readme {
  overflow: scroll;
}
</style>
