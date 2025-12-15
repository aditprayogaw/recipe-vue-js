<script setup>
    import BaseInput from "../ui/BaseInput.vue";
    import BaseButton from "../ui/BaseButton.vue";
    import { reactive, ref } from "vue";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";

    const store = useStore();
    const router = useRouter();

    const register = async () => {
        if (
            signupData.password !== signupData.confirmationPassword ||
            signupData.password.length < 8
        ) {
            signupData.confirmationPassword = "";
            signupData.password = "";
            confirmPasswordDoesNotMatch.value = "none";
            confirmPasswordMatch.value = "none";
        } else {
            try {
                await store.dispatch("auth/getRegisterData", signupData);
                
                router.push("/"); 
            } catch (error) {
            console.error("Gagal Register:", error);

            let errorMessage = "Terjadi kesalahan sistem.";
            
            if (error.response && error.response.data && error.response.data.error) {
                const errorCode = error.response.data.error.message;
                
                if (errorCode === 'EMAIL_EXISTS') {
                    errorMessage = "Email ini sudah terdaftar. Silakan gunakan email lain.";
                } else if (errorCode === 'WEAK_PASSWORD') {
                    errorMessage = "Password terlalu lemah menurut sistem.";
                } else if (error.response.status === 401) {
                    errorMessage = "Gagal menyimpan data (Unauthorized). Cek Rules Database Anda.";
                } else {
                    errorMessage = errorCode; 
                }
            }
            
            alert(errorMessage);
            }
        }
    };

    const passwordStatusDisplay = ref("none");

    const passwordCheck = () => {
        if ((signupData.password || '').length < 8) {
            passwordStatusDisplay.value = "block";
        } else {
            passwordStatusDisplay.value = "none";
        }
        confirmationPasswordCheck();
    };

    const signupData = reactive({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        confirmationPassword: "",
        isLogin: false,
        imageLink: "",
    });

    const confirmPasswordDoesNotMatch = ref("none");
    const confirmPasswordMatch = ref("none");

    const confirmationPasswordCheck = () => {
        if (!signupData.confirmationPassword) {
            confirmPasswordDoesNotMatch.value = "none";
            confirmPasswordMatch.value = "none";
            return;
        }

        if (signupData.password !== signupData.confirmationPassword) {
            confirmPasswordDoesNotMatch.value = "block";
            confirmPasswordMatch.value = "none";
        } else {
            confirmPasswordDoesNotMatch.value = "none";
            confirmPasswordMatch.value = "block";
        }
    };

    const checkImage = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.addEventListener("load", () => {
            signupData.imageLink = reader.result;
        });
    };
</script>

<template>
    <div class="container-fluid py-5" style="background-color: #f5f5f5">
        <div style="background-color: #ffffff" class="p-5 m-auto signup-form">
        <div class="text-center">
            <img src="../../assets/images/Logo.png" alt="Logo" />
            <h2 class="mt-4">Create your account</h2>
            <p>Enter your details to use all the app features.</p>
        </div> 

        <form class="mt-3" @submit.prevent="register">
            <div class="row">
                <div class="col-md-6">
                    <base-input 
                        type="text"
                        identity="firstname"
                        placeholder="Ex: Nobaru"
                        label="First Name">
                    </base-input>
                </div>
                <div class="col-md-6">
                    <base-input 
                        type="text"
                        identity="lastname"
                        placeholder="Ex: Yamada"
                        label="Last Name">
                    </base-input>
                </div>
            </div>

            <div class="my-4">
                <base-input 
                    type="text"
                    identity="username"
                    placeholder="Ex: nobaru_yamada"
                    label="Username">
                </base-input>
            </div>
            <div class="my-4">
                <base-input 
                    type="email"
                    identity="email"
                    placeholder="Ex: nobaru_yamada@example.com"
                    label="Email"
                    v-model="signupData.email"
                ></base-input>
            </div>
            <!-- <div class="my-4">
                <label for="email">Email</label>
                <input 
                    type="email" 
                    class="form-control"
                    placeholder="Masukkan email test"
                    v-model="signupData.email"
                >
            </div> -->
            <div class="my-4">
                <base-input 
                    type="password"
                    identity="password"
                    placeholder="Enter your password"
                    label="Password"
                    v-model="signupData.password"
                    @input="passwordCheck"
                    @keyup="passwordCheck"
                >
                </base-input>
                
                <p class="text-danger mt-1 fw-medium" style="font-size: 11px;" :style="{ display: passwordStatusDisplay }">
                    The password must be at least 8 characters long.
                </p>
                
            </div>
            <div class="my-4">
                <base-input 
                    type="password"
                    identity="confirmationPassword"
                    placeholder="Re-enter your password"
                    label="Confirmation Password"
                    v-model="signupData.confirmationPassword"
                    @input="confirmationPasswordCheck"
                >
                </base-input>
                <p class="text-danger mt-1 fw-medium" style="font-size: 11px" :style="{ display: confirmPasswordDoesNotMatch }">
                    The password confirmation does not match
                </p>
                <p class="text-success mt-1 fw-medium" style="font-size: 11px" :style="{ display: confirmPasswordMatch }">
                    The password confirmation does match 
                </p>
            </div>
            <div class="my-4">
                <base-input
                    type="file"
                    identity="recipeImage"
                    label="Profile Photo"
                    isImage="true"
                    @input="checkImage"
                >
                    <div>
                        <div class="border p-1 mt-2 rounded-circle">
                            <img 
                                :src="signupData.imageLink" 
                                alt="Profile Photo" 
                                class="rounded-circle" 
                                width="140px" 
                                height="140px" 
                                style="object-fit: cover;"/>
                        </div>
                        <div class="text-center"
                            style="transform: translateY(-24px)">
                            <i class="fa-solid fa-camera fs-5 p-2 rounded-circle bg-white"></i>
                        </div>
                    </div>
                </base-input>
            </div>
            
        </form>

        <base-button 
            class="login w-100 my-3"
            @click="register"
        >Register</base-button>

        <div class="text-center mt-4">
            <p class="fw-semibold">
            Already have account?<span style="color: #4c4ddc"
                ><router-link to="/login" class="text-decoration-none"> Login</router-link></span
            >
            </p>
        </div>
        </div>
    </div>
</template>