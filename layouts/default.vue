<template>
  <v-app>
    <TopBar />
    <nuxt />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import TopBar from '@/components/TopBar.vue'

export default defineComponent({
  components: {
    TopBar,
  },
})
</script>
