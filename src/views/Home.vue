<template>
  <div class="home container">
    <!-- <h3>delIndex: {{ delIndex }}</h3> -->

    <transition name="askdel">
      <app-askdel v-if="askDel" >
        <div class="mt-4 float-right">
          <button @click.stop="askDel = false" class="btn mr-3 btn-secondary">Cancel</button>
          <button @click.stop="askDelAns" class="btn btn-danger">Yes</button>
        </div>
      </app-askdel>       
    </transition>
    <div v-if="askDel" @click="askDel = false" class="askdel-fade"></div>



    <div class="main-grid">
        <app-newproject></app-newproject>

      <div @click="$router.push(`/project/${proj.id}`)" v-for="(proj, index) in projects" :key="proj.id" class="projects">
        <div @click.stop="delPorject(index)" class="delBoardBtn bg-danger">X</div>

        <div class="folder folder__project">
            <!-- {{ index }} -->
            {{ proj.projectName }}
            <!-- {{ proj.id }} -->
        </div>
      </div>

      
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NewboardinputVue from '../components/Newboardinput.vue'
import askDelmodelVue from '../components/askDelmodel.vue';

export default {
  name: 'home',
  data() {
    return {
      askDel: false,
      delIndex: 0,
    }
  },
  computed: {
    projects() {
      return this.$store.getters.get_projects
    }
  },
  methods: {
    delPorject(index) {
      this.askDel = true
      this.delIndex = index
      // this.$store.dispatch('delProjectNow', index)
    },
    askDelAns() {
      this.askDel = false
      this.$store.dispatch('delProjectNow', this.delIndex)
    }
  },
  components: {
    appNewproject: NewboardinputVue,
    appAskdel: askDelmodelVue,
  }
}
</script>

<style lang="sass">
.folder
  box-shadow: 0px 0px 5px #005e82
  text-align: center
  height: 140px
  line-height: 140px
  font-size: 1.8rem
  cursor: pointer
  border-radius: 5px
  color: #2c3e50

.folder__project
  transition: all 80ms ease-out
  background: #C4C4C4
  &:hover
    background: #0092cc
    box-shadow: 0px 0px 15px #005e82

.projects
  position: relative
.delBoardBtn
  width: 30px
  height: 30px
  text-align: center
  line-height: 30px
  position: absolute
  right: -7px
  top: -12px
  border-radius: 30px
  cursor: pointer
  display: none
  z-index: 10
.projects:hover .delBoardBtn
  display: block

.main-grid
  display: grid
  grid-template-columns: repeat(3, 1fr)
  grid-gap: 10px
.projects-grid

</style>
