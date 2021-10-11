import axios from 'axios';

/**
*  @title snippets/state
*  @desc state of snippets store.
**/
export const state = () => ({
  public_latest: [],
  current: {},
  list: []
})

export const actions = {
  /**
  *  @title snippets/fetchSnippetById
  *  @desc getting specific id of snippet
  *  @param {String} snippet_id snippet to fetch.
  **/
  fetchSnippetById: async ({ commit }, options) => {
    await axios.get(`http://localhost:5000/${options.snippet_id}`)
      .then(res => {
        commit("setState", { statePath: 'current', data: res.data })
      });
  },
  /**
  *  @title snippets/fetchTopSnippets
  *  @desc getting top score by last date snippets
  **/
  fetchTopSnippets: async ({ commit }, options) => {
    await axios.get(`http://localhost:5000/`)
      .then(res => {
        commit("setState", { statePath: 'public_latest', data: res.data })
      });
  },
  /**
  *  @title snippets/fetchExploreSnippets
  *  @desc get snippets for /explore route
  **/
  fetchExploreSnippets: async ({ commit }, options) => {
    await axios.get(`http://localhost:5000/explore`)
      .then(res => {
        commit("setState", { statePath: 'list', data: res.data })
      });
  },
  /**
  *  @title snippets/fetchSnippetPOST
  *  @desc get snippets for /explore route
  *  @param {Object} snippetSchema snippet object to send to backend
  **/
  fetchSnippetPOST: async ({ commit }, options) => {
    await axios.post(`http://localhost:5000/`, options.snippetSchema)
      .then(res => {
        commit("setState", { statePath: 'current', data: res.data })
      });
  },
}

export const getters = {
  getComponentData: (state) => {
    return {
      id: state.current?._id,
      date_created: state.current.snippet_info?.date_created,

      title: state.current.snippet_info?.title,
      author: state.current.snippet_info?.owner_id,
      public: state.current.snippet_settings?.public_view,

      code: state.current.snippet_data,
      views: state.current?.views,
    }
  },
  getTopSnippets: (state) => {
    return state.public_latest;
  },
  getSnippetsList: (state) => {
    return state.list;
  },
  getCurrentSnippet: (state) => {
    return state.current;
  },
}

export const mutations = {
  // Set state @universal
  // @params data, statePath
  setState(state, options) {
    const { statePath } = options;
    state[statePath] = options.data;
  },

  add(state, text) {
    state.list.push({
      text,
      done: false
    })
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  }
}
