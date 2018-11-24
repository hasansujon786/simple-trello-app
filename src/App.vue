<template>
  <div id="app">
      <router-link to="/" class="home-link">
        <div id="nav">
          Home
        </div>
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
    this.$store.dispatch('getDatafmLocalNow')
    console.log('creted');
  }
}
</script>


<style lang="sass">
body
  height: 100vh
  background: #282828
  // color: #fff
#app 
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  

#nav
  width: 80px
  height: 80px
  border-radius: 100px
  background: #42b983
  text-align: center
  line-height: 80px
  margin: 20px auto 40px
  cursor: pointer
.home-link
  text-decoration: none
  color: #fff
  font-weight: bold
  
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
  position: absolute
  right: 30px
  bottom: 30px
</style>