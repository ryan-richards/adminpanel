<template>
    <Dash v-if="store.user" />
    <Auth v-else />
</template>


<script>
import { store } from "../store"
import { supabase } from "../supabase"
import Auth from "../components/Auth.vue"
import Dash from "../components/Dash.vue"

export default {
  components: {
    Auth,
    Dash
  },

  setup() {
    store.user = supabase.auth.user()
    supabase.auth.onAuthStateChange((_, session) => {
      store.user = session.user
    })

    return {
      store,
    }
  },
}
</script>

