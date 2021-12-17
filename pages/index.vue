<template>
  <BaseContainer class="container">
    <v-sheet class="pa-2" :elevation="3" :width="sheetWidth">
      <v-img
        class="mb-2"
        :max-width="sheetWidth"
        :src="state.repoStatImageUrl"
      />
      <UserCard v-if="state.userInfo" class="mb-2" :user="state.userInfo" />
      <v-img
        class="mb-2"
        :max-width="sheetWidth"
        :src="state.topLangsStatImageUrl"
      />
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
import { Route } from '@/plugins/route'

type State = {
  repoStatImageUrl: string
  topLangsStatImageUrl: string
  explanationRoutes: Route[]
  userInfo: UserResponse | null
}

const sheetWidth = 550

export default defineComponent({
  components: {
    BaseContainer,
    UserCard,
  },
  setup() {
    const {
      $getFilteredRoutes,
      $getRepoStatImageUrl,
      $getTopLangsStatImageUrl,
      $repositories,
      $vuetify,
    } = useContext()
    const route = useRoute()
    const state = reactive<State>({
      repoStatImageUrl: '',
      topLangsStatImageUrl: '',
      explanationRoutes: [],
      userInfo: null,
    })

    const setStatImageUrls = (isDark: boolean): void => {
      state.repoStatImageUrl = $getRepoStatImageUrl(isDark)
      state.topLangsStatImageUrl = $getTopLangsStatImageUrl(
        isDark,
        '&layout=compact'
      )
    }

    onMounted(async () => {
      setStatImageUrls($vuetify.theme.dark)
      state.userInfo = await $repositories.user.retrieve()
      state.explanationRoutes = $getFilteredRoutes([route.value.name!])
    })

    watch(
      () => $vuetify.theme.dark,
      (isDark) => {
        setStatImageUrls(isDark)
      }
    )

    return {
      state,
      sheetWidth,
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
