<template>
  <div class="about">
    <h1>This is an about page</h1>

    <button @click="gotoHome">go to home</button>
  </div>
</template>

<script>
export default {
  methods: {
    gotoHome() {
      this.$router.push('/')
    }
  }
}
</script>

