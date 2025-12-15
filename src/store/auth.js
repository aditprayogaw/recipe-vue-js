import axios from "axios";
import Cookies from "js-cookie";


export default {
    namespaced: true,
    state() {
        return {
            token: null,
            tokenExpirationDate: null,
            userLogin: {},
            isLogin: false,
        }
    },
    
    mutations: { 
        setToken(state, { idToken, expiresIn }) {
            state.token = idToken;
            state.tokenExpirationDate = expiresIn;
            Cookies.set("tokenExpirationDate", expiresIn);
            Cookies.set("jwt", idToken);
        },
        setUserLogin(state, { userData, loginStatus }) {
            state.userLogin = userData;
            state.isLogin = loginStatus; 
        },
        setUserLogout(state) {
            state.token = null;
            state.userLogin = {};
            state.isLogin = false; 
            state.tokenExpirationDate = null;
            Cookies.remove("jwt");
            Cookies.remove("UID");
            Cookies.remove("tokenExpirationDate");
        }
    },
    actions: { 
        async getRegisterData({ commit, dispatch }, payload) {
            const APIkey = "AIzaSyBPsRN_SQqHdA4_E6oSSy85TSfDqat1xFM";
            const authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
            
            try {
                const { data } = await axios.post(authUrl + APIkey, {
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true,
                });

                commit("setToken", {
                    idToken: data.idToken,
                    expiresIn: new Date().getTime() + Number.parseInt(data.expiresIn) * 1000,
                });

                const newUserData = {
                    userId: data.localId,
                    firstname: payload.firstname,
                    lastname: payload.lastname,
                    username: payload.username,
                    email: payload.email,
                    imageLink: payload.imageLink,
                };

                Cookies.set("UID", newUserData.userId);
                
                await dispatch("addNewUser", newUserData);

            } catch (err) {
                console.log("Error di getRegisterData:", err);
                throw err; 
            }
        },

        async addNewUser({ commit, state }, payload) {
            try {
                const { data } = await axios.post(
                    `https://vue-js-project-84957-default-rtdb.firebaseio.com/users.json?auth=${state.token}`, 
                    payload
                );
                commit("setUserLogin", { userData: payload, loginStatus: true });
            } catch (err) {
                console.log("Error di addNewUser:", err);
                throw err;
            }
        },

        async getLoginData({ commit, dispatch }, payload) {
            const APIkey = "AIzaSyBPsRN_SQqHdA4_E6oSSy85TSfDqat1xFM";
            const authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

            try {
                const { data } = await axios.post(authUrl + APIkey, {
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true,
                });

                commit("setToken", {
                    idToken: data.idToken,
                    expiresIn: new Date().getTime() + Number.parseInt(data.expiresIn) * 1000,
                });

                await dispatch("getUser", data.localId);

            } catch (err) {
                throw err;
            }
        },

        async getUser({ commit, state }, userId) {
            try {
                const { data } = await axios.get(
                    `https://vue-js-project-84957-default-rtdb.firebaseio.com/users.json?auth=${state.token}`
                );
                
                for (let key in data) {
                    if (data[key].userId === userId) {
                        Cookies.set("UID", data[key].userId);
                        commit("setUserLogin", { 
                            userData: data[key], 
                            loginStatus: true 
                        });
                    }   
                } 
            } catch (err) {     
                console.log(err);
                throw err;
            }
        },
    }
}