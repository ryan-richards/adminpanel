<template>
  <div class="container pl-4 pr-4 pb-6">
    <div class="level is-mobile">
      <div class="level-left">
          <router-link to="/" class="level-item pt-6"><div class="subtitle has-text-white">Brook Avenue Admin</div></router-link>
      </div>
   <div class="level-right">
          <router-link to="/profile" class="level-item pt-6"><span class="iconify" data-icon="healthicons:ui-user-profile" data-width="35" data-height="35"></span></router-link>
   </div>
    
    </div>

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
