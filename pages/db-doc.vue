<template>
  <BaseContainer>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <v-sheet class="db-document pa-2" :elevation="3" v-html="dbDoc" />
  </BaseContainer>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import dbSchema from '@/docs/db/schema.md'

export default defineComponent({
  setup() {
    const dbDoc = computed(() => {
      return dbSchema
    })
    return {
      dbDoc,
    }
  },
})
</script>
