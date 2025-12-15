import { createRouter, createWebHistory } from "vue-router";
import Cookies from "js-cookie";
import { store } from "./store/index.js"; 

// Import Komponen
import HomePage from "./components/pages/HomePage.vue";
import LoginPage from "./components/pages/LoginPage.vue";
import SignupPage from "./components/pages/SignupPage.vue";
import DetailPage from "./components/pages/DetailPage.vue";
import UserPage from "./components/user/UserPage.vue"; 
import NewRecipePage from "./components/pages/NewRecipePage.vue";
import EditRecipePage from "./components/pages/EditRecipePage.vue";

// Fungsi Cek Autentikasi
const checkAuth = () => {
    const jwtCookie = Cookies.get("jwt");
    const expirationData = Cookies.get("tokenExpirationDate");
    const userId = Cookies.get("UID");

    if (jwtCookie) {
        if (new Date().getTime() <= +expirationData) {
            store.commit("auth/setToken", {
                idToken: jwtCookie,
                expiresIn: expirationData,
            });
            store.dispatch("auth/getUser", userId);
            return true;
        } else {
            store.dispatch("auth/setUserLogout");
            return false;
        }        
    } else {
        return false;
    }
}

// Definisi Routes
const routes = [
    { 
        path: '/', 
        name: 'homePage', 
        component: HomePage,
        beforeEnter: () => {
            checkAuth();
        }
    },
    { 
        path: '/user/:component', 
        name: 'UserPage', 
        component: UserPage,
        beforeEnter: (to, from, next) => {
            checkAuth() ? next() : next({ name: 'login' });
        },
    },
    {
        path: "/new-recipe", 
        name: "NewRecipePage", // Perbaikan Typo
        component: NewRecipePage,
        beforeEnter: (to, from, next) => {
            checkAuth() ? next() : next({ name: 'login' });
        },
    },
    {
        path: "/recipe/edit/:id", 
        name: "EditRecipePage",
        component: EditRecipePage,
        beforeEnter: (to, from, next) => {
            checkAuth() ? next() : next({ name: 'login' });
        },
    },
    { path: '/login', name: 'login', component: LoginPage },
    { path: '/signup', name: 'signup', component: SignupPage },
    { path: '/recipe/:id', name: 'detailPage', component: DetailPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;