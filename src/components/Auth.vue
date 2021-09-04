<template>

<div class="columns pt-6 is-centered">
  <div class="column is-half">

    <form class="container p-3" @submit.prevent="handleLogin">
    <div class="form-widget">
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

  </div>
</div>

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
        const { error } = await supabase.auth.signIn({ email: email.value,
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