<template>
  <div>
    <div>
      <button @click="signIn('github')">Signin with Github</button>
      <button @click="signIn('google')">Signin with Google</button>

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
