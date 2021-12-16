<template>
  <v-card
    class="user-card d-flex justify-space-around align-center"
    light
    :max-width="450"
  >
    <v-avatar color="indigo" :size="100">
      <v-img :src="user.avatarUrl" />
    </v-avatar>
    <v-list>
      <!-- Name -->
      <v-list-item>
        <v-icon>mdi-account-circle</v-icon>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6" v-text="user.login" />
            <v-list-item-subtitle v-text="user.name" />
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
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { UserResponse } from '@/api/User'

export default defineComponent({
  name: 'UserCard',
  props: {
    user: {
      type: Object as PropType<UserResponse>,
      required: true,
    },
  },
})
</script>
