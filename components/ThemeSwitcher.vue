<template>
  <div class="theme-switcher">
    <v-switch
      v-model="state.isDrak"
      color="white"
      hide-details
      @change="handleChange"
    >
      <template #label>
        <v-icon :color="state.isDrak ? 'grey' : ''">mdi-brightness-6</v-icon>
      </template>
    </v-switch>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  SetupContext,
} from '@nuxtjs/composition-api'

type State = {
  isDrak: boolean
}

export default defineComponent({
  emits: ['switch-theme'],
  setup(_, context: SetupContext) {
    const state = reactive<State>({
      isDrak: false,
    })

    const handleChange = (): void => {
      context.emit('switch-theme', state.isDrak)
    }
    return {
      state,
      handleChange,
    }
  },
})
</script>
