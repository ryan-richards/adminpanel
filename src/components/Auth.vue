<template>
  <form class="row flex flex-center" @submit.prevent="handleLogin">
    <div class="col-6 form-widget">
      <h1 class="header">Brook Avenue Admin</h1>
      <p class="description">Sign in below</p>
      <div>
        <input
          class="inputField"
          type="email"
          placeholder="Email"
          v-model="email"
        />
      </div>
        <div>
        <input
          class="inputField"
          type="password"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <div>
        <input
          type="submit"
          class="button block"
          :value="loading ? 'Loading' : 'Sign In'"
          :disabled="loading"
        />
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from "vue"
import { supabase } from "../supabase"

export default {
  setup() {
    const loading = ref(false)
    const email = ref("")
    const password =  ref("")


    const handleLogin = async () => {
      try {
        loading.value = true
        const { error } = await supabase.auth.signUp({ email: email.value,
        password: password.value
        })
        alert("Logged In")
        if (error) throw error
      } catch (error) {
        alert(error.error_description || error.message)
      } finally {
        loading.value = false
      }
    }

    return {
      loading,
      email,
      password,
      handleLogin,
    }
  },
}
</script>