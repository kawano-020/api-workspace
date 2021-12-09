<template>
  <div>
    <h1>{{ "Welcome to WorkSpace" }}</h1>
    <img
      src = "https://github-readme-stats.vercel.app/api/pin/?username=kawano-020&repo=api-workspace&show_owner=true&show_icons=true"
    />
    <v-btn @click="$router.push('/doc')">{{"API Doc"}}</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
