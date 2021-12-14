<!-- Please remove this file from your project -->
<template>
  <div class="top-bar">
    <v-app-bar
      color="indigo darken-2"
      dark
      fixed
    >
      <v-app-bar-nav-icon @click="state.isSideMenuVisible = !state.isSideMenuVisible" />
      <v-toolbar-title>WorkSpace</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="state.isSideMenuVisible"
      absolute
      bottom
      temporary
    >
      <v-list
        nav
      >
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
import { defineComponent, onMounted, reactive, useRoute, useRouter } from '@nuxtjs/composition-api'

type Route = {
  title: string
  pathName: string
}

type State = {
  currentRouteIndex: number | null
  isSideMenuVisible: Boolean
}

const routes: Route[] = [
  { title: 'Home', pathName: 'index' },
  { title: 'API Document', pathName: 'doc' }
]

export default defineComponent({
  setup () {
    const route = useRoute()
    const router = useRouter()
    const state = reactive<State>({
      currentRouteIndex: null,
      isSideMenuVisible: false
    })

    onMounted(() => {
      resolveCurrentRouteIndex()
    })

    const resolveCurrentRouteIndex = () => {
      const currentRouteIndex = routes.findIndex((element) => {
        return element.pathName === route.value.name
      })
      state.currentRouteIndex = currentRouteIndex
    }

    const handleRoute = (route: Route) => {
      router.push({ name: route.pathName })
    }
    return {
      state,
      routes,
      handleRoute
    }
  }
})
</script>

<style lang="scss" scoped>
.top-bar {
  margin-bottom: 64px;
}
</style>
