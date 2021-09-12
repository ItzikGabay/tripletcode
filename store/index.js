export const state = () => ({
    list: []
})

export const actions = {
    getLatestSnippets: async ({ commit }, data) => {
        let result = await fetch('http://localhost:4001/')
            .then((res) => {
                let result = res.json()
                result.then((resArray) => {
                    commit("pushAll", resArray)
                    return resArray
                })
            })
        // commit("pushAll", data)
        // return data
    }
}

export const mutations = {
    // pushAll: ((state, data) => state.list = data),
    pushAll(state, data) {
        state.list = data
    },

    add(state, text) {
        state.list.push({
            text,
            done: false
        })
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