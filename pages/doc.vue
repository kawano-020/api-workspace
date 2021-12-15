<template>
  <iframe
    v-if="state.nodeEnv === 'production'"
    :src="`${$router.options.base}` + 'redoc.html'"
  />
  <BaseContainer v-else class="develop">
    <v-row class="caution" justify="center">
      <v-icon left :size="50">mdi-alert-rhombus</v-icon>
      <h1>
        {{ 'Production Only.' }}
      </h1>
    </v-row>
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
  background: white;
  border: none;
  width: 100vw;
  height: calc(100vh - 64px);
}
.develop {
  padding: 24px;
  .caution {
    h1 {
      display: inline-block;
    }
  }
}
</style>
