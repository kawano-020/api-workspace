<template>
  <div class="top-bar">
    <v-app-bar color="indigo darken-2" dark fixed>
      <v-app-bar-nav-icon
        @click="state.isSideMenuVisible = !state.isSideMenuVisible"
      />
      <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
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
            v-for="route in validatedRoutes"
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
  computed,
  defineComponent,
  reactive,
  useContext,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import { routes, Route } from '@/lib/route'

type State = {
  currentRouteTitle: string
  isSideMenuVisible: boolean
}

export default defineComponent({
  name: 'TopBar',
  components: {
    ThemeSwitcher,
  },
  setup() {
    const { $vuetify } = useContext()
    const route = useRoute()
    const router = useRouter()
    const state = reactive<State>({
      currentRouteTitle: '',
      isSideMenuVisible: false,
    })

    const pageTitle = computed(() => {
      const appName = 'WorkSpace'
      const currentRouteDetail = routes.find((element) => {
        return element.pathName === route.value.name
      })
      if (currentRouteDetail) {
        return `${appName} - ${currentRouteDetail.title}`
      } else {
        return appName
      }
    })

    const validatedRoutes = computed(() => {
      return routes.filter((element) => {
        return element.pathName !== route.value.name
      })
    })

    const switchTheme = (isDrak: boolean): void => {
      $vuetify.theme.dark = isDrak
    }

    const handleRoute = (route: Route): void => {
      router.push({ name: route.pathName })
    }
    return {
      state,
      pageTitle,
      validatedRoutes,
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
