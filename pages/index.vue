<template>
  <BaseContainer class="container">
    <v-sheet class="pa-2" :elevation="3" :width="sheetWidth">
      <v-img class="mb-2" :max-width="sheetWidth" :src="repoStatImageUrl" />
      <UserCard v-if="state.userInfo" class="mb-2" :user="state.userInfo" />
      <v-img class="mb-2" :max-width="sheetWidth" :src="userStatImageUrl" />
      <v-card outlined>
        <v-list>
          <v-list-item-group>
            <v-divider />
            <div v-for="route in state.explanationRoutes" :key="route.title">
              <v-list-item @click="$router.push({ name: route.pathName })">
                <v-icon>mdi-file-document-outline</v-icon>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title v-text="route.title" />
                    <v-list-item-subtitle v-text="route.description" />
                  </v-list-item-content>
                </v-list-item>
              </v-list-item>
              <v-divider />
            </div>
          </v-list-item-group>
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
  useRoute,
  watch,
} from '@nuxtjs/composition-api'
import BaseContainer from '@/components/BaseContainer.vue'
import { UserResponse } from '~/api/User'
import UserCard from '@/components/UserCard.vue'
import { getFilteredRoutes, Route } from '@/lib/route'
import { GithubInfo } from '@/lib/githubInfo'

type State = {
  statImageTheme: string
  statImageBackgroundColor: string
  explanationRoutes: Route[]
  userInfo: UserResponse | null
}

const sheetWidth = 550
const githubInfo = new GithubInfo()

export default defineComponent({
  components: {
    BaseContainer,
    UserCard,
  },
  setup() {
    const { $repositories, $vuetify } = useContext()
    const route = useRoute()
    const state = reactive<State>({
      statImageTheme: '',
      statImageBackgroundColor: '',
      explanationRoutes: [],
      userInfo: null,
    })

    onMounted(async () => {
      state.userInfo = await $repositories.user.retrieve()
      state.explanationRoutes = getFilteredRoutes([route.value.name!])
    })

    watch(
      () => $vuetify.theme.dark,
      (isDark) => {
        state.statImageTheme = isDark ? 'dark' : 'default_repocard'
        state.statImageBackgroundColor = isDark ? '1e1e1e' : ''
      }
    )

    const getStatImageUrl = (
      section: string,
      queryString: string = ''
    ): string => {
      const baseUrl =
        `https://github-readme-stats.vercel.app/api/${section}/` +
        `?username=${githubInfo.userName}` +
        `&repo=${githubInfo.repositoryName}&show_owner=true` +
        '&show_icons=true'
      return (
        `${baseUrl}${queryString}&theme=${state.statImageTheme}` +
        `&bg_color=${state.statImageBackgroundColor}`
      )
    }

    const repoStatImageUrl = computed(() => {
      return getStatImageUrl('pin')
    })

    const userStatImageUrl = computed(() => {
      return getStatImageUrl('top-langs', '&layout=compact')
    })

    return {
      state,
      sheetWidth,
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
