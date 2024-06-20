<template>
  <div>
    <div>
      <a
        href="/api/auth/signin"
        class="buttonPrimary"
        >Native Link Sign in</a
      >

      <button @click="signIn('github')">JS Sign In</button>

      <button @click="signOut()">Sign Out</button>
    </div>
    <div>
      <pre>{{ status }}</pre>
      <pre>{{ data?.user }}</pre>
      <pre>{{ data?.expires }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
const { signIn, signOut, status, data } = useAuth()
</script>
