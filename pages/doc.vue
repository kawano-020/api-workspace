<template>
  <div>
  <!-- <div v-if="state.nodeEnv === 'production'">
  <iframe src="/redoc.html"></iframe>
  </div>
  <div v-else> -->
    {{ 'Only Production.' }}
  </div>
</template>

// <script lang="ts">
// import { defineComponent, onMounted, reactive } from '@nuxtjs/composition-api'

// export default defineComponent({
//   setup() {
//     const state = reactive({
//       nodeEnv: ''
//     })
//     onMounted(() => {
//       state.nodeEnv = process.env.NODE_ENV!
//     })
//     return {
//       state
//     }
//   },
// })
// </script>


<style lang="scss" scoped>
iframe {
  border: none;
  width: 100vw;
  height: 100vh;
}
</style>
