<template>
  <div class="container pl-3 pr-3">
    <router-link to="/"><div class="subtitle has-text-white pt-6 pb-4 ">Brook Avenue Admin</div></router-link>
    <router-view />
  </div>
</template>

<script>
import { store } from "./store"
import { supabase } from "./supabase"

export default {


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
