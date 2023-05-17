// import { getLocalStorage, setLocalStorage, clearLocalStorage, clearSessionStorage } from './localStorage'
import * as api from "../api"

export const state = {
    new_todo: {},
    allTodos: [],
    todo: {},


}

export const mutations = {
    CREATE_TODO(state, {todo}) {
        state.new_todo = todo;
    },
    SET_ALL_TODOS(state, payload) {
        state.allTodos = [...payload]
    },
    SET_TODO(state, payload) {
        state.todo =payload.todo;
    },
    DELETE_TODO(state, payload) {
        const findIndex = state.allTodos.findIndex(({ id }) => id === payload)
        findIndex !== -1 && state.allTodos.splice(findIndex, 1)
    },
    // LOGOUT(state) {
    //     api.setHeader(null);
    //     state.isLogged = false;
    //     state.authUser = null;
    //     state.accessToken = '';
    //     clearLocalStorage();
    //     clearSessionStorage();
    // },
}

export const actions = {
    async create({ commit }, {toast,title, description}) {
        // create new todo
        let todoData = await api.post('/createTodo', {title, description});
        if (todoData && todoData.success) {
            commit('CREATE_TODO', {todo: todoData.todo})
        }else if(todoData.status == 422){
            toast.$toast.warning(todoData.error['title']?todoData.error['title']:''+' '+todoData.error['description']?todoData.error['description']:'')
            return ;
        }
        toast.$toast.success(todoData.message)
        return todoData;
    },
    async getAllTodos({ commit},{page, perPage, search}) {
        // fetch all todos
        return await api.get(`/todos?page=${page}&perPage=${perPage}&search=${search}`).then((response) => {
            if(response && response.todos) {
                commit('SET_ALL_TODOS', response.todos)
            }
            return response;
        })
    },
    async update({ commit }, data) {
        // update selected todo
        const toast = data.toast;
        let todoData = await api.put(`/updateTodo/${data.id}`, {...data});
        if (todoData && todoData.success) {
            commit('SET_TODO', todoData)
        }else if(todoData.status == 422){
            toast.$toast.warning(todoData.error['title']?todoData.error['title']:''+' '+todoData.error['description']?todoData.error['description']:'')
            return ;
        }
        toast.$toast.success(todoData.message)
        return todoData;
    },
    async getTodo({commit}, data) { 
        // get selected todo
        return await api.get(`/getTodo/${data}`).then((response) => {
            if (response ) {                
                commit('SET_TODO', response)
            }
            return response
        })
    },
    async deleteTodo({ commit }, data) {
        // delete selected todo
        const toast = data.toast;
        return await api.deleteAPI(`/deleteTodo/${data.id}`).then((response) => {
            if(response.success ==true){
                commit('DELETE_TODO', data.id)
            }
        toast.$toast.success(response.message)
            return response
        })
    },
}

export const getters = {
    allTodos: ({ allTodos }) => allTodos,
    todo: ({ todo }) => todo,



}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
