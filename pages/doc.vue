<template>
  <iframe
    v-if="state.nodeEnv === 'production'"
    :src="`${$router.options.base}` + 'redoc.html'"
  />
  <BaseContainer v-else>
    {{ 'Only Production.' }}
  </BaseContainer>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from '@nuxtjs/composition-api'
import BaseContainer from '@/components/BaseContainer.vue'

export default defineComponent({
  components: {
    BaseContainer,
  },
  setup() {
    const state = reactive({
      nodeEnv: '',
    })
    onMounted(() => {
      state.nodeEnv = process.env.NODE_ENV!
    })
    return {
      state,
    }
  },
})
</script>

<style lang="scss" scoped>
iframe {
  border: none;
  width: 100vw;
  height: calc(100vh - 64px);
}
</style>
