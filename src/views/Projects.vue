<template>
  <div class="container">
    <div class="top-board">
      <h1 class="display-4">{{ project.projectName }}</h1>
      <!-- <h3>ID: {{ projectId }}</h3> -->
      <!-- <h2>getProjIndex: {{ getProjIndex }}</h2> -->
      <!-- <p>{{ project }}</p> -->
      <!-- <p>myBoardList: {{ myBoardList }}</p> -->
      <div class="tool-box d-flex">
        <h3>Tools</h3>
        <div @click="addNewBoard" class="board-btn">B</div>
        <div @click="addNewTextArea" class="board-btn">T</div>
      </div>
    </div>
    
    
    <draggable
      class="row"
      v-model="myBoardList"
      :options="{group:'board'}"
      @start="drag=true"
      @end="drag=false">
      <app-board
        v-for="(board, boardIndex) in boards"
        :key="boardIndex"
        :board="board"
        :prjIndex="getProjIndex"
        :boardIndex="boardIndex">
      </app-board>

    </draggable>



  </div>
</template>

<script>
import draggable from 'vuedraggable'
import BoardVue from '../components/Board.vue'

export default {
  data() {
    return {
      projectId: this.$route.params.id,
      newBoardName: 'New task board',
    }
  },
  computed: {
    project() {
      return this.$store.getters.get_projects.find(item => {
        // get the selected project by projectId
        return item.id == this.projectId
      })
    },
    getProjIndex() {
      return this.$store.getters.get_projects.indexOf(this.project)
    },
    boards() {
      // returns all the boards from the selected project
      return this.project.boards
    },
    textAreas() {
      return this.project.textAreas
    },
    myBoardList: {
      get() {
        return this.$store.state.projects[this.getProjIndex].boards
      },
      set(value) {
        const order = {
          value,
          project: this.getProjIndex
        }
        this.$store.dispatch('updateMyBoardLisd', order)
      }
    }
  },
  methods: {
    addNewBoard() {
      this.$store.dispatch('addNewBoardNow', {
        newBoardName: this.newBoardName,
        index: this.getProjIndex
      })
    },
    addNewTextArea() {
      this.$store.dispatch('addNewTextAreaNow', {
        newTextAreaName: 'New text Area',
        projIdx: this.getProjIndex
      })
    }
  },
  components: {
    appBoard: BoardVue,
    draggable,
  }
}
</script>

<style>
.top-board {
  margin-top: -70px;
  margin-bottom: 30px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.board-btn {
  border: 1px solid #C4C4C4;
  width: 25px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  cursor: pointer;
  margin-left: 15px;
}
</style>
