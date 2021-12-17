<template>
  <v-card class="d-flex justify-space-around align-center" outlined>
    <v-list>
      <!-- Name -->
      <v-list-item>
        <v-icon>mdi-source-repository</v-icon>
        <v-list-item>
          <v-list-item-title class="text-h6" v-text="repo.name" />
        </v-list-item>
      </v-list-item>
      <v-divider />
      <!-- Description -->
      <div v-if="repo.description">
        <v-list-item>
          <v-icon>mdi-information-variant</v-icon>
          <v-subheader v-text="repo.description" />
        </v-list-item>
        <v-divider />
      </div>
      <!-- Pushed At -->
      <v-list-item>
        <v-icon>mdi-update</v-icon>
        <v-subheader v-text="`${pushedAt}`" />
      </v-list-item>
      <v-divider />
      <!-- Created At -->
      <v-list-item>
        <v-icon>mdi-clock-time-four-outline</v-icon>
        <v-subheader v-text="`${createdAt}`" />
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  useContext,
} from '@nuxtjs/composition-api'
import { GithubRepository } from '@/api/Github'

type Props = {
  repo: GithubRepository
}

export default defineComponent({
  name: 'UserCard',
  props: {
    repo: {
      type: Object as PropType<GithubRepository>,
      required: true,
    },
  },
  setup(props: Props) {
    const { $formatedIsoDateString } = useContext()

    const pushedAt = computed(() => {
      return $formatedIsoDateString(props.repo.pushedAt)
    })

    const createdAt = computed(() => {
      return $formatedIsoDateString(props.repo.createdAt)
    })

    return {
      pushedAt,
      createdAt,
    }
  },
})
</script>
