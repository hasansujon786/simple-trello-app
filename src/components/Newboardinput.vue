<template>
  <div>
    <div @click="newBoardInput" v-if="!showMenu" 
    class="folder folder__newF">Create New Project</div>

    <div v-else class="folder folder__newF__menu">
      <input
        @keyup.esc="hideInput"
        ref="focus"
        v-model="newProjectName"
        type="text"
        class="form-control"
        placeholder="What you'r gonna name your project?"
        @keyup.enter="createNewProject"
      >
      <div class="d-flex justify-content-end mt-4">
        <button @click="hideInput" class="btn mr-3 btn-secondary">Cancel</button>
        <button @click="createNewProject" class="btn create">Create</button>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false,
      newProjectName: 'New Project'
    }
  },
  methods: {
    newBoardInput() {
      this.showMenu = true
      this.setFocus()
    },
    createNewProject() {
      this.$store.dispatch('createNewProjectNow', this.newProjectName)
      this.newProjectName = 'New Project'
      this.showMenu = false
    },
    hideInput() {
      this.showMenu = false
    },
    setFocus() {
      setTimeout(() => {
        this.$refs.focus.focus()
      }, 300);
    },
  }
}
</script>

  
<style lang="sass">
.folder__newF
  background: #42b983
  transition: all 150ms ease-out
  &__menu
    transition: all 100ms ease-out
    padding: 20px 20px
    background: #42b983
    button.create
      background: #0092cc
      color: #fff

</style>
