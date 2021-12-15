<template>
  <v-app>
    <TopBar />
    <BaseContainer>
      <nuxt />
    </BaseContainer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import TopBar from '@/components/TopBar.vue'
import BaseContainer from '@/components/BaseContainer.vue'

export default defineComponent({
  components: {
    BaseContainer,
    TopBar
  }
})
</script>
