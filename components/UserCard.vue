<template>
  <v-card
    class="user-card d-flex justify-space-around align-center"
    light
    :max-width="500"
  >
    <v-avatar color="gray" :size="150">
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
      <v-divider />
      <!-- Registiation Date -->
      <v-list-item>
        <v-icon>mdi-account-edit</v-icon>
        <v-subheader v-text="`${formatedCreatedAt}`" />
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { UserResponse } from '@/api/User'

type Props = {
  user: UserResponse
}

export default defineComponent({
  name: 'UserCard',
  props: {
    user: {
      type: Object as PropType<UserResponse>,
      required: true,
    },
  },
  setup(props: Props) {
    const formatedCreatedAt = computed(() => {
      const createdAt = new Date(props.user.createdAt)
      const year = createdAt.getFullYear()
      const month = createdAt.getMonth()
      const date = createdAt.getDate()
      const hour = createdAt.getHours()
      const minute = createdAt.getMinutes()
      return `${year}/${month}/${date} ${hour}:${minute}`
    })

    return {
      formatedCreatedAt,
    }
  },
})
</script>
