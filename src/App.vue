<template>
  <div id="app">
      <router-link to="/" class="home-link">
          Home
      </router-link>
    <router-view/>
    <div @click="saveToLoacal" class="save-btn">
      Save
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    saveToLoacal() {
      this.$store.dispatch('saveToLocalNow')
    }
  },
  created() {
    console.log('creted');
    this.$store.dispatch('getDatafmLocalNow')
  }
}
</script>


<style lang="sass">
body
  // height: 100vh
  background: #282828
#app 
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  

.home-link
  text-decoration: none
  color: #fff
  font-weight: bold
  position: relative
  width: 80px
  height: 80px
  display: block
  border-radius: 100px
  background: #42b983
  text-align: center
  line-height: 80px
  margin: 20px auto 40px
  &:hover
    text-decoration: none
    box-shadow: 0 0 12px rgba(66, 185, 131, 0.4)

.save-btn
  width: 70px
  height: 70px
  line-height: 70px
  border-radius: 100px
  background: #42b983
  text-align: center
  margin: 20px auto
  cursor: pointer
  color: #fff
  font-weight: bold
  position: fixed
  right: 30px
  bottom: 30px
</style>