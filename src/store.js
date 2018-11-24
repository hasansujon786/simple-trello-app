import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    projects: [],
    id: 1,
  },
  mutations: {
    set_createNewProjectNow(state, newProjName) {
			state.projects.push({
        projectName: newProjName,
        id: state.id,
        boards: [],
      })
      state.id++
    },
    set_addNewBoard(state, payload) {
			state.projects[payload.index].boards.push({
        name: payload.newBoardName,
        tasks: [],
        isTextArea: false,
      })
    },
    set_addNewTaskNow(state, order) {
      state.projects[order.prjIndx].boards[order.bordIndx].tasks.push({
        name: order.name,
        completed: false,
      })
    },
    set_delBoardNow(state, indxs) {
      state.projects[indxs.prjIndx].boards.splice(indxs.bordIndx, 1)
    },
    set_delTaskNow(state, indxs) {
			state.projects[indxs.project].boards[indxs.board].tasks.splice(indxs.task, 1)
    },
    updateMyTaskList(state, order) {
      state.projects[order.project].boards[order.board].tasks = order.value
    },
    set_updateMyBoardLisd(state, order) {
      state.projects[order.project].boards = order.value
    },
    set_saveToLocalNow(state) {
      localStorage.setItem('projects', JSON.stringify(state.projects))
      localStorage.setItem('id', JSON.stringify(state.id))
      console.log('Data saved to local');
    },
    set_getDatafmLocalNow(state) {
      state.projects = JSON.parse(localStorage.getItem('projects') || '[]')
      state.id = JSON.parse(localStorage.getItem('id') || '55')
      console.log('set_getDatarmLocalNow');
    },
    set_delProjectNow(state, index) {
      state.projects.splice(index, 1)
    },
    set_renameBoardNow(state, order) {
      state.projects[order.prjIndex].boards[order.boardIndex].name = order.newName
    },
    set_addNewTextAreaNow(state, order) {
      state.projects[order.projIdx].boards.push({
        name: order.newTextAreaName,
        text: 'Put your texts here.',
        isTextArea: true,
      })
    }



  },
  actions: {
    createNewProjectNow({commit}, newProjName) {
      commit('set_createNewProjectNow', newProjName)
    },
    addNewBoardNow({commit}, payload) {
      commit('set_addNewBoard', payload)
    },
    addNewTaskNow({commit}, order) {
      commit('set_addNewTaskNow', order)
    },
    delBoardNow({commit}, indxs) {
      commit('set_delBoardNow', indxs)
    },
    delTaskNow({commit}, indxs) {
      commit('set_delTaskNow', indxs)
    },
    updateMyBoardLisd({commit}, order) {
      commit('set_updateMyBoardLisd', order)
      
    },
    saveToLocalNow({commit}) {
      commit('set_saveToLocalNow')
    },
    getDatafmLocalNow({commit}) {
      commit('set_getDatafmLocalNow')
    },
    delProjectNow({commit}, index) {
      commit('set_delProjectNow', index)
    },
    renameBoardNow({commit}, order) {
      commit('set_renameBoardNow', order)
    },
    addNewTextAreaNow({commit}, order) {
			commit('set_addNewTextAreaNow', order)
      
    }

  },
  getters: {
    get_projects(state) {
      return state.projects
    },

    
  }
})
