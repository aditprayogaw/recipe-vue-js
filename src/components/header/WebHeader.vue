<script setup>
import ProfileMenu from "./ProfileMenu.vue";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

const isLogin = computed(() => store.state.auth.isLogin);

const userImage = computed(() => store.state.auth.userLogin.imageLink);
</script>

<template>
  <header class="shadow-sm container-fluid bg-white py-3 border-bottom fixed-top">
    <div class="container-md d-flex justify-content-between align-items-center">
      <router-link to="/">
        <img src="@/assets/images/Logo.png" alt="Logo" />
      </router-link>

      <div>
        <div v-if="!isLogin">
            <router-link to="/login" class="btn btn-outline-primary me-2">Login</router-link>
            <router-link to="/signup" class="btn btn-primary">Sign Up</router-link>
        </div>

        <div v-else class="dropdown">
            <a class="d-block link-dark text-decoration-none dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                <img 
                    :src="userImage || '@/assets/images/user.png'" 
                    alt="User" 
                    width="32" height="32" 
                    class="rounded-circle"
                    style="object-fit: cover;"
                >
            </a>
            <profile-menu></profile-menu>
        </div>
      </div>
    </div>
  </header>
</template>