<template>
  <div class="home container">
    <div class="main-grid">
      <div>
        <app-newproject></app-newproject>
      </div>

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

export default {
  name: 'home',
  data() {
    return {
      projectsId: this.$route.params.id
    }
  },
  computed: {
    projects() {
      return this.$store.getters.get_projects
    }
  },
  methods: {
    delPorject(index) {
      this.$store.dispatch('delProjectNow', index)
    }
  },
  components: {
    appNewproject: NewboardinputVue
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
    // transform: scale(1.02)
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
