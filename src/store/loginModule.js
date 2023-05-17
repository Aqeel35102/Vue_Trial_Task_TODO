import { getLocalStorage, setLocalStorage, clearLocalStorage, clearSessionStorage } from './localStorage'
import * as api from "../api"

export const state = {
    // isLogged: getLocalStorage('isLogged') || '',
    isLogged: false,
    accessToken: getLocalStorage('accessToken') || '',
    authUser: JSON.parse(getLocalStorage('authUser')) || {},
}

export const mutations = {
    SIGN_IN(state, {user, token}) {
        state.isLogged = true;
        state.authUser = user || {};
        state.accessToken = token;
        // setLocalStorage('isLogged', true);
        setLocalStorage('accessToken', token);
        setLocalStorage('authUser', JSON.stringify(user));
    },
    REGISTER(state, data) {
        console.log(data);
    },
    LOGOUT(state) {
        api.setHeader(null);
        state.isLogged = false;
        state.authUser = null;
        state.accessToken = '';
        clearLocalStorage();
        clearSessionStorage();
    },
}

export const actions = {
    async login({ commit }, {toast,email, password}) {
        // login user
        let userData = await api.post('/login', {email, password});
        if (userData && userData.access_token) {
            api.setHeader(userData.access_token);
            commit('SIGN_IN', {user: userData.user, token: userData.access_token})
        }else if(userData.status == 401){
            toast.$toast.warning(userData.error)
            return ;

        }else if(userData.status == 422){
            toast.$toast.warning(userData.error['email']?userData.error['email']:''+' '+userData.error['password']?userData.error['password']:'')
            return ;
        }
        toast.$toast.success("User Login Successfully.")
        return userData;
    },
    async register({ commit }, {toast,email, password, password_confirmation}) {
        // register new user
        let userData = await api.post('/register', {email, password, password_confirmation});
        if (userData && userData.access_token) {
            commit('REGISTER',userData)
        }else if(userData.status == 401){
            toast.$toast.warning(userData.error)
            return ;

        }else if(userData.status == 422){
            toast.$toast.warning(userData.error['email']?userData.error['email']:''+' '+userData.error['password']?userData.error['password']:'')
            return ;
        }
        toast.$toast.success("Registration successful. Verification Link sent to your Email.")
        return userData;
    },

    async logout({ commit }) {
        // logout user
         await api.post('/logout');
        commit('LOGOUT');
        window.location.href = '/login';
        return ;
    },
}

export const getters = {
    isLogged: ({ isLogged }) => isLogged,
    getAuthUser: ({ authUser }) => authUser,

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
