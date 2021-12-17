<template>
  <div v-if="errorMessage" class="d-flex justify-center">
    <v-icon :size="50" left>mdi-alert-rhombus-outline</v-icon>
    <h1>
      {{ errorMessage }}
    </h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    errorMessage: {
      type: String as PropType<string>,
      default: 'Under Development.',
    },
  },
})
</script>
