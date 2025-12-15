<script setup>
    import BaseInput from "../ui/BaseInput.vue"
    import BaseButton from "../ui/BaseButton.vue"
    import { useStore } from "vuex"
    import { useRouter } from "vue-router"
    import { reactive } from "vue"

    const store = useStore();
    const router = useRouter();

    const loginData = reactive({
        email: "",
        password: ""
    });

    const login = async () => {
        try {
            await store.dispatch("auth/getLoginData", loginData);
            
            router.push("/");
            
        } catch (error) {
            console.error(error);
            alert("Login Gagal! Password salah atau Email tidak ditemukan.");
        }
    };  
</script>

<template>
    <div class="container-fluid py-5 mt-4" style="background-color: #f5f5f5;">
        <div style="background-color: #ffffff; width: 600px; min-height: 100px;" class="p-5 m-auto login-form">
            <div class="text-center">
                <img src="../../assets/images/Logo.png" alt="Logo" />
                <h2 class="mt-4">Log in to your account</h2>
            </div>
            <form @submit.prevent="login">
                <div class="my-4">
                    <base-input type="email" identity="email" placeholder="Your Email" label="Email" v-model="loginData.email"></base-input>
                </div>
                <div class="my-4">
                    <base-input type="password" identity="password" placeholder="Your password" label="Password" v-model="loginData.password"></base-input>
                </div>
            </form>
            <base-button class="login w-100 my-3" @click="login">Login</base-button>
            <div class="text-center mt-4">
                <p class="fw-semibold">Don't have an account? <router-link to="/signup">Signup</router-link></p>
            </div>
        </div>
    </div>
</template>