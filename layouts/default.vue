<template>
  <v-app
    :style="isDark ? { background: $vuetify.theme.themes.dark.background } : ''"
  >
    <TopBar />
    <nuxt />
  </v-app>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import { useContext } from '@nuxtjs/composition-api'
import TopBar from '@/components/TopBar.vue'

export default defineComponent({
  components: {
    TopBar,
  },
  setup() {
    const { $vuetify } = useContext()
    const isDark = computed(() => {
      return $vuetify.theme.dark
    })
    return {
      isDark,
    }
  },
})
</script>
