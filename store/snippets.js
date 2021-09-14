
import axios from 'axios';
export const state = () => ({
    public_latest: [],
    current: {},
    list: []
})

export const actions = {
    getSnippet: async ({ commit }, options) => {
        await axios.get(`http://localhost:4001/${options.snippet_id}`)
        .then(res => {
            commit("setState", { statePath: 'current', data: res.data})
        });
    }
}

export const getters = {
    getCurrent: (state) => {
        return {
            id: state.current?._id,
            date_created: state.current.snippet_info?.date_created,

            title: state.current.snippet_info?.title,
            author: state.current.snippet_info?.owner_id,
            public: state.current.snippet_settings?.public_view,

            code: state.current.snippet_data,
            views: state.current?.views,
        }
    }
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