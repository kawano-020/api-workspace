<template>
  <BaseContainer class="container">
    <v-sheet class="pa-2" :elevation="3" :width="sheetWidth">
      <v-img class="mb-2" :max-width="sheetWidth" :src="repoStatImageUrl" />
      <UserCard v-if="state.userInfo" class="mb-2" :user="state.userInfo" />
      <v-img class="mb-2" :max-width="sheetWidth" :src="userStatImageUrl" />
      <v-card outlined>
        <v-list>
          <div
            v-for="(description, index) in descriptions"
            :key="description.title"
          >
            <v-list-item>
              <v-icon>mdi-file-document-outline</v-icon>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title v-text="description.title" />
                  <v-list-item-subtitle v-text="description.content" />
                </v-list-item-content>
              </v-list-item>
            </v-list-item>
            <v-divider v-if="index < descriptions.length - 1" />
          </div>
        </v-list>
      </v-card>
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
  watch,
} from '@nuxtjs/composition-api'
import BaseContainer from '@/components/BaseContainer.vue'
import { UserResponse } from '~/api/User'
import UserCard from '@/components/UserCard.vue'

type State = {
  statImageTheme: string
  statImageBackgroundColor: string
  userInfo: UserResponse | null
}

type Description = {
  title: string
  content: string
}

const sheetWidth = 550

const descriptions: Description[] = [
  {
    title: 'Repositories',
    content: '説明',
  },
  {
    title: 'API Documents',
    content: '説明',
  },
  {
    title: 'DB Documents',
    content: '説明',
  },
]

export default defineComponent({
  components: {
    BaseContainer,
    UserCard,
  },
  setup() {
    const { $repositories, $vuetify } = useContext()
    const state = reactive<State>({
      statImageTheme: '',
      statImageBackgroundColor: '',
      userInfo: null,
    })

    onMounted(async () => {
      state.userInfo = await $repositories.user.retrieve()
    })

    watch(
      () => $vuetify.theme.dark,
      (isDark) => {
        state.statImageTheme = isDark ? 'dark' : 'default_repocard'
        state.statImageBackgroundColor = isDark ? '1e1e1e' : ''
      }
    )

    const repoStatImageUrl = computed(() => {
      const baseUrl =
        'https://github-readme-stats.vercel.app/api/pin/' +
        '?username=kawano-020&repo=api-workspace&show_owner=true' +
        '&show_icons=true'
      return (
        `${baseUrl}&theme=${state.statImageTheme}` +
        `&bg_color=${state.statImageBackgroundColor}`
      )
    })

    const userStatImageUrl = computed(() => {
      const baseUrl =
        'https://github-readme-stats.vercel.app/api/top-langs/' +
        '?username=kawano-020&repo=api-workspace&show_owner=true' +
        '&layout=compact&show_icons=true'

      return (
        `${baseUrl}&theme=${state.statImageTheme}` +
        `&bg_color=${state.statImageBackgroundColor}`
      )
    })

    return {
      state,
      sheetWidth,
      descriptions,
      repoStatImageUrl,
      userStatImageUrl,
    }
  },
})
</script>

<style lang="scss" scoped>
.container {
  * {
    margin: 0 auto;
  }
}
</style>
