<template>
    <Dashboard v-if="store.user" />
    <Auth v-else />
</template>


<script>
import { store } from "../store"
import { supabase } from "../supabase"
import Auth from "../components/Auth.vue"
import Dashboard from "../components/Dashboard.vue"

export default {
  components: {
    Auth,
    Dashboard
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

