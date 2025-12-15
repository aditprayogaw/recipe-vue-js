<script setup>
    import { useRouter } from "vue-router"
    import { useStore } from "vuex"

    const store = useStore();
    const router = useRouter();

    const logout = () => {
        store.commit("auth/setUserLogout");
        
        router.push("/");
    };
</script>

<template>
    <ul class="dropdown-menu dropdown-menu-end">
        <li class="dropdown-item">My Profile</li>
        <li class="dropdown-item">Favorited Recipes</li>
        <li class="dropdown-item">My Recipes</li>
        <li><hr class="dropdown-divider" /></li>
        <li class="dropdown-item" style="cursor: pointer" @click="logout">
            Logout
        </li>
    </ul>
</template>