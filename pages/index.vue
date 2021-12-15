<template>
  <BaseContainer>
    <h1>{{ 'Welcome to WorkSpace' }}</h1>
    <img
      src="https://github-readme-stats.vercel.app/api/pin/?username=kawano-020&repo=api-workspace&show_owner=true&show_icons=true"
    />
  </BaseContainer>
</template>

<script lang="ts">
import { defineComponent, onMounted, useContext } from '@nuxtjs/composition-api'
import BaseContainer from '@/components/BaseContainer.vue'

export default defineComponent({
  components: {
    BaseContainer,
  },
  setup() {
    const { $repositories } = useContext()
    onMounted(async () => {
      const a = await $repositories.repository.list()
      console.warn(a)
    })
  },
})
</script>
