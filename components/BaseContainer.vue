<template>
  <v-container class="base-container">
    <slot />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'BaseContainer',
})
</script>

<style lang="scss" scoped>
.base-container {
  width: 850px;
}
</style>
