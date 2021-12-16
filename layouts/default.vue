<template>
  <v-app :style="isDark ? { background: backgroundColorWhenDark } : ''">
    <TopBar />
    <nuxt />
  </v-app>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import { useContext } from '@nuxtjs/composition-api'
import colors from 'vuetify/es5/util/colors'
import TopBar from '@/components/TopBar.vue'

export default defineComponent({
  components: {
    TopBar,
  },
  setup() {
    const { $vuetify } = useContext()
    const backgroundColorWhenDark = colors.grey.darken4
    const isDark = computed(() => {
      return $vuetify.theme.dark
    })
    return {
      backgroundColorWhenDark,
      isDark,
    }
  },
})
</script>
