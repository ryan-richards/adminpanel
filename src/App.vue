<template>
  <div class="container" style="padding: 50px 0 100px 0">
    <router-link to="/"><div class="subtitle has-text-white pb-5">Brook Avenue Admin</div></router-link>
    <router-view />

  </div>
</template>

<script>
import { store } from "./store"
import { supabase } from "./supabase"
import Auth from "./components/Auth.vue"
import Email from "./components/Email.vue"

export default {
  components: {
    Auth,
    Email,
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
