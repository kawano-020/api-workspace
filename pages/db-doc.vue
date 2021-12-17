<template>
  <BaseContainer>
    <ErrorMessage />
  </BaseContainer>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import ErrorMessage from '@/components/ErrorMessage.vue'

export default defineComponent({
  components: {
    ErrorMessage,
  },
})
</script>
