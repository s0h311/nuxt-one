<template>
  <section>
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

    <div>
      <button @click="checkout">CHECKOUT</button>
    </div>
  </section>
</template>

<script setup lang="ts">
const { signIn, signOut, status, data } = useAuth()

async function checkout(): Promise<void> {
  await $fetch('api/stripe/checkout', { method: 'post' })
}
</script>

<style scoped>
section {
  display: grid;
  gap: 40px;
}

div {
  display: flex;
  gap: 20px;
}
</style>
