<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore()
const userData = computed(() => {
    return store.state.auth.userLogin

})
</script>

<template>
    <div class="d-flex align-items-center">
        <img
            :src="userData.imageLink"
            width="36" height="36"
            class="rounded-circle" style="object-fit: cover" 
        />

        <div class="ps-3">
            <p class="my-0 fs-5 fw-semibold">
                {{ userData.firstname }} {{ userData.lastname }} 
            </p>
            <p class=" my-0 fs-6 text-secondary">
                {{ userData.email }}
            </p>
        </div>
    </div>
</template>