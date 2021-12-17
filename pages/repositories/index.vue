<template>
  <BaseContainer>
    <v-row class="caution mt-1" justify="center">
      <v-icon left :size="50">mdi-alert-rhombus-outline</v-icon>
      <h1>
        {{ 'Under development.' }}
      </h1>
    </v-row>
  </BaseContainer>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {},
})
</script>
