<template>
  <div>
    <Navbar />
    <div class="content">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  name: 'default',

  components: {
    Navbar
  },

  layout: 'default'
}
</script>

<style lang="scss">
.content {
  margin: 20px auto;
  width: 80%;
}
</style>