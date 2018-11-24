<template>
  <div :class="[{'col-3': !isTextArea}, {'col-6': isTextArea}]">
    <div class="board card mb-4" :class="[{'bg-info': isTextArea}, {'bg-teal': !isTextArea}]" :id="isTextEditMood">
      <div class="card-header"  @dblclick="showRenameBoardMenu">
        <!-- header -->
        <div @click="delBoard" class="deleteIcon board__delBtn bg-danger">X</div>
        <div v-if="showBrdNamdChange">
          <!-- Board rename input -->
          <input class="form-control" @keyup.esc="showBrdNamdChange = false" @keydown.enter="showBrdNamdChange = false" v-model.lazy="board.name">
        </div>
        <span v-else>
          {{ board.name }} |
          {{ isTextArea }} ha
          <!-- {{ boardIndex }} -->
        </span>
        <!-- header end -->
      </div>
      <div class="card-body" >
            
        <figure  @dblclick="showTextInputArea = true" v-if="isTextArea">
          <!--  text Area input -->
          <div v-if="showTextInputArea">
            <textarea v-model="board.text"  @blur="updateTextArea"  @keyup.enter.ctrl="updateTextArea" @keyup.esc="updateTextArea" class="board__textArea bg-secondary" rows="10" ></textarea>
          </div>
          <!-- texts -->
          <div class="board__text" v-else>
            <div @click="showTextInputArea = true"  class="board-btn float-right">E</div>
            <p>{{ board.text }}</p>
          </div>
        </figure>



        <figure v-else>
          <!-- task area body -->
          <input
            v-model="newTaskName"
            @keyup.enter="addNewTask"
            type="text"
            class="form-control form-control--task bg-teal"
            placeholder="New Task">
          <!-- tasks -->
          <draggable
            v-model="myTaskList"
            :options="{group:'task'}"
            @start="drag=true"
            @end="drag=false">
            <div
              @dblclick="task.completed = !task.completed"
              :class="{'bg-tasks--done': task.completed}"
              class="list-group-item task mt-2 bg-teal"
              v-for="(task, taskIndex) in board.tasks"
              :key="taskIndex">
              {{ task.name }}
              <!-- {{ task.completed }} -->
              <span @click="delTask(taskIndex)" class="deleteIcon task__delBtn bg-danger" >X</span>
            </div>
          </draggable>
        </figure>
      </div> 
    </div>
    <!-- card body end -->
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  data() {
    return {
      newTaskName: '',
      showDelBtn: false,
      showBrdNamdChange: false,
      newBoardName: 'New task board',
      showTextInputArea: false,
      newText: ''
    }
  },
  props: ['board', 'boardIndex', 'prjIndex'],
  computed: {
    myTaskList: {
      get() {
        return this.$store.state.projects[this.prjIndex].boards[this.boardIndex]
          .tasks
      },
      set(value) {
        const order = {
          value,
          board: this.boardIndex,
          project: this.prjIndex
        }
        this.$store.commit('updateMyTaskList', order)
      }
    },
    isTextArea() {
      return this.board.isTextArea
    },
    isTextEditMood() {
      return this.showTextInputArea == true ? 'bg-secondary' : ''
    }
  },
  methods: {
    addNewTask() {
      const order = {
        prjIndx: this.prjIndex,
        bordIndx: this.boardIndex,
        name: this.newTaskName
      }
      this.$store.dispatch('addNewTaskNow', order)
      this.newTaskName = ''
    },
    delBoard() {
      const indxs = {
        prjIndx: this.prjIndex,
        bordIndx: this.boardIndex
      }
      this.$store.dispatch('delBoardNow', indxs)
    },
    delTask(taskIndex) {
      const indxs = {
        task: taskIndex,
        board: this.boardIndex,
        project: this.prjIndex
      }
      this.$store.dispatch('delTaskNow', indxs)
    },
    showRenameBoardMenu() {
      this.showBrdNamdChange = true
    },
    renameBoard() {
      //  = this.$store.state.projects[this.prjIndex].boards[this.boardIndex].name
      const order = {
        newName: this.newBoardName,
        prjIndex: this.prjIndex,
        boardIndex: this.boardIndex
      }
      this.$store.dispatch('renameBoardNow', order)
      this.showBrdNamdChange = false
    },
    updateTextArea() {
      this.showTextInputArea = false
    },
    consoleSomething() {
      console.log('hasan mahmud')
    }
    
    
    
    
  },
  components: {
    draggable
  }
}
</script>

<style>
.deleteIcon {
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  position: absolute;
  right: -10px;
  top: -10px;
  border-radius: 30px;
  cursor: pointer;
  display: none;
}
.task:hover .deleteIcon {
  display: block;
}
.card-header:hover .deleteIcon {
  display: block;
}
.card-header {
  cursor: pointer;
}
.board__text {
  white-space: pre-line;
}
.board__textArea {
  border: none;
  width: 100%;
  padding: 0;
}
#bg-secondary {
  background-color: #6c757d !important;
}
.bg-teal {
  background: #20c997;
}
.bg-tasks--done {
  background: hsl(162, 73%, 44%);
  color: #2d8067;
  border: 1px solid hsl(162, 65%, 44%);

}
.form-control--task {
  border: 1px solid rgba(0, 0, 0, 0.125);
}
.form-control--task:focus {
  background: hsl(162, 65%, 46%);
  border: 1px solid hsl(157, 94%, 36%);
}

</style>
