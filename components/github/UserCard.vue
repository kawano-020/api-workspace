<template>
  <v-card class="d-flex justify-space-around align-center" outlined>
    <v-avatar color="indigo" :size="150">
      <v-img :src="user.avatarUrl" />
    </v-avatar>
    <v-list>
      <!-- Name -->
      <v-list-item>
        <v-icon>mdi-account-circle</v-icon>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6" v-text="user.name" />
            <v-list-item-subtitle v-text="user.login" />
          </v-list-item-content>
        </v-list-item>
      </v-list-item>
      <v-divider />
      <!-- Location -->
      <v-list-item>
        <v-icon>mdi-map-marker</v-icon>
        <v-subheader v-text="user.location" />
      </v-list-item>
      <v-divider />
      <!-- RoposCount -->
      <v-list-item>
        <v-icon>mdi-source-repository-multiple</v-icon>
        <v-subheader v-text="`${user.publicRepos} Repo(s)`" />
      </v-list-item>
      <v-divider />
      <!-- Registiation Date -->
      <v-list-item>
        <v-icon>mdi-account-edit</v-icon>
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
import { GithubUser } from '@/api/Github'

type Props = {
  user: GithubUser
}

export default defineComponent({
  name: 'UserCard',
  props: {
    user: {
      type: Object as PropType<GithubUser>,
      required: true,
    },
  },
  setup(props: Props) {
    const { $formatedIsoDateString } = useContext()
    const createdAt = computed(() => {
      return $formatedIsoDateString(props.user.createdAt)
    })

    return {
      createdAt,
    }
  },
})
</script>
