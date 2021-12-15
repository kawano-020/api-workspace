<template>
  <div class="top-bar">
    <v-app-bar color="indigo darken-2" dark fixed>
      <v-app-bar-nav-icon
        @click="state.isSideMenuVisible = !state.isSideMenuVisible"
      />
      <v-toolbar-title>{{ 'WorkSpace' }}</v-toolbar-title>
      <v-spacer />
      <ThemeSwitcher @switch-theme="switchTheme" />
    </v-app-bar>

    <v-navigation-drawer
      v-model="state.isSideMenuVisible"
      absolute
      bottom
      temporary
    >
      <v-list nav>
        <v-list-item-group
          v-model="state.currentRouteIndex"
          active-class="indigo--text text--accent-4"
        >
          <v-list-item
            v-for="route in routes"
            :key="route.title"
            @click="handleRoute(route)"
          >
            <v-list-item-title>{{ route.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  useContext,
  useRouter,
} from '@nuxtjs/composition-api'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'

type Route = {
  title: string
  pathName: string
}

type State = {
  currentRouteTitle: string
  isSideMenuVisible: boolean
}

const routes: Route[] = [
  { title: 'Home', pathName: 'index' },
  { title: 'API Document', pathName: 'doc' },
]

export default defineComponent({
  name: 'TopBar',
  components: {
    ThemeSwitcher,
  },
  setup() {
    const { $vuetify } = useContext()
    const router = useRouter()
    const state = reactive<State>({
      currentRouteTitle: '',
      isSideMenuVisible: false,
    })

    const switchTheme = (isDrak: boolean): void => {
      $vuetify.theme.dark = isDrak
    }

    const handleRoute = (route: Route): void => {
      router.push({ name: route.pathName })
    }
    return {
      state,
      routes,
      switchTheme,
      handleRoute,
    }
  },
})
</script>

<style lang="scss" scoped>
.top-bar {
  margin-bottom: 64px;
}
</style>
