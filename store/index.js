import axios from 'axios';

export const state = () => ({
  namespaced: true,
  list: [],
  currentSnippet: {
    title: '',
    date_created: '',
    author: '',
    code: '',
    public: '',
    views: '',
    id: ''
  },
  currentView: {}
})

export const actions = {
  getLatestSnippets: async ({ commit }, data) => {
    // let result = await fetch('https://triplet-code.herokuapp.com/')
    await fetch('http://localhost:5000/')
      .then((res) => {
        let result = res.json()
        result.then((resArray) => {
          commit("pushAll", resArray)
          return resArray
        })
      })
    // return data
  },
  addNewSnippet: async ({ commit }, data) => {
    // await $axios.get('https://triplet-code.herokuapp.com/')
    await $axios.get('http://localhost:5000/')
      .then((res) => {
        commit("add", res.data)
      })
  },
  getSnippet: async ({ commit }, options) => {
    // return await axios.get(`https://triplet-code.herokuapp.com/${options.snippet_id}`)
    return await axios.get(`http://localhost:5000/${options.snippet_id}`)
      .then(res => {
        console.log(res.data);
      })
  }
  // getSnippetById: async ({ commit }, data) => {
  //     await $axios.get(`http://localhost:4001/${data}`)
  //         .then((res) => {
  //             // commit("add", res.data)
  //             console.log(res);
  //         })
  // },
}

export const mutations = {
  // pushAll: ((state, data) => state.list = data),
  pushAll(state, data) {
    state.list = data
  },

  setCurrentSnippetState(state, data) {
    state.currentSnippet = data
  },

  setCurrentViewState(state, data) {
    state.currentView = data
  },

  add(state, snippet) {
    state.list.unshift(snippet)
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  }
}

export const getters = {
  getList: (state) => {
    return state.list
  }
}
