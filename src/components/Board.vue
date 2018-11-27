<template>
  <div :class="[{'col-3': !isTextArea}, {'col-6': isTextArea}]">
    <div
      class="board card mb-4"
      :class="[{'bg-info': isTextArea}, {'bg-teal': !isTextArea}, {'shakeBox': shake}]"
      :id="isTextEditMood"
    >
      <div class="card-header" @dblclick="showRenameBoardInput">
        <!-- header -->
        <div @click="delBoard" class="deleteIcon board__delBtn bg-danger">X</div>
        <div v-if="showBrdNamdChange">
          <!-- Board rename input -->
          <input
            placeholder="Board Name"
            ref="focus"
            class="form-control header__input"
            @blur="hideRenameBoardInput"
            @keyup.esc="hideRenameBoardInput"
            @keydown.enter="hideRenameBoardInput"
            v-model.lazy="board.name"
          >
        </div>
        <span class="board__name" v-else>
          {{ board.name.length == 0 ? "Board Name" : board.name }}
          <!-- {{ isTextArea }} -->
          <!-- {{ boardIndex }} -->
        </span>
        <!-- header end -->
      </div>
      <div class="card-body">
        <!--  text Area -->
        <figure @dblclick="showTextInputAreaNow" v-if="isTextArea">
          <div v-if="showTextInputArea">
            <textarea
              ref="focus"
              v-model="board.text"
              @blur="updateTextArea"
              @keyup.enter.ctrl="updateTextArea"
              @keyup.esc="updateTextArea"
              class="board__textArea bg-secondary"
              rows="10"
            ></textarea>
          </div>
          <!-- texts -->
          <div class="board__text" v-else>
            <div @click="showTextInputAreaNow" class="board-btn float-right">E</div>
            <p>{{ board.text }}</p>
          </div>
        </figure>

        <!-- task board -->
        <figure v-else>
          <input
            @focus="disableDrag('on')"
            @blur="disableDrag('off')"
            v-model="newTaskName"
            @keyup.enter="addNewTask"
            type="text"
            class="animated form-control form-control--task bg-teal"
            autofocus
            placeholder="New Task Name"
            :class="{'shakeBox-input': shake}"
          >
          <!-- tasks -->
          <draggable
            v-model="myTaskList"
            :options="{group:'task'}"
            @start="drag=true"
            @end="drag=false"
          >
            <transition-group name="tasks" mode="out-in">
              <div
                @dblclick="task.completed = !task.completed"
                :class="{'bg-tasks--done': task.completed}"
                class="list-group-item task mt-2 bg-teal"
                v-for="(task, taskIndex) in board.tasks"
                :key="task.name"
              >
                {{ task.name }}
                <!-- {{ task.completed }} -->
                <span @click="delTask(taskIndex)" class="deleteIcon task__delBtn bg-danger">X</span>
              </div>
            </transition-group>
          </draggable>
        </figure>
      </div>
    </div>
    <!-- card end -->
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  data() {
    return {
      newTaskName: '',
      newBoardName: '',
      showBrdNamdChange: false,
      showTextInputArea: false,
      shake: false,
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
      if(this.newTaskName.length > 0) {
        const order = {
          prjIndx: this.prjIndex,
          bordIndx: this.boardIndex,
          name: this.newTaskName
        }
        this.$store.dispatch('addNewTaskNow', order)
        this.newTaskName = ''
      } else {
        this.shake = true
        setTimeout(() => {
          this.shake = false
        }, 1200);
      }
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
    showRenameBoardInput() {
      this.showBrdNamdChange = true
      this.setFocus()
      this.disableDrag('on')
    },
    hideRenameBoardInput() {
      this.showBrdNamdChange = false
      this.disableDrag('off')
    },
    setFocus() {
      setTimeout(() => {
        this.$refs.focus.focus()
      }, 300);
    },
    showTextInputAreaNow() {
      this.showTextInputArea = true
      this.setFocus()
      this.disableDrag('on')
    },
    updateTextArea() {
      this.showTextInputArea = false
      this.disableDrag('off')
    },
    disableDrag(key) {
      // it will disable the drag of boards
      let value = false
      key == 'on' ? value = true : value = false
      this.$emit('disableDrag-em', value)
    }

    
    
    
    
  },
  components: {
    draggable
  },

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
  font-weight: 700;
  font-size: 18px;
  text-align: center;
}
.board {
  min-height: 378px;
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
.bg-tasks--done, .bg-tasks--done:hover {
  background: hsl(162, 73%, 44%);
  color: #2d8067;
  border: 1px solid hsl(162, 65%, 44%);
  text-decoration: line-through;
}
.form-control--task {
  border: 1px solid rgba(0, 0, 0, 0.125);
}
.form-control--task:focus {
  background: hsl(162, 65%, 46%);
  border: 1px solid hsl(157, 94%, 36%);
}
.header__input {
  background: #d6d7da !important;
}
.tasks-enter-active {
  animation: bounceIn 0.75s;
}
.shakeBox {
  animation: shake 1s ease-in-out;
}
.shakeBox-input:focus {
  box-shadow: 0 0 0 0.2rem rgba(87, 189, 4, 0.6);
}



@-webkit-keyframes shake {
  from,
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0);
  }

  20%,
  40%,
  60%,
  80% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0);
  }
}

@keyframes shake {
  from,
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0);
  }

  20%,
  40%,
  60%,
  80% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0);
  }
}


@-webkit-keyframes bounceIn {
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    -webkit-transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    -webkit-transform: scale3d(0.97, 0.97, 0.97);
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

@keyframes bounceIn {
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    -webkit-transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    -webkit-transform: scale3d(0.97, 0.97, 0.97);
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
</style>
