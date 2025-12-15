<script setup>
    import { computed } from "vue";
    import { useStore } from "vuex";

    const store = useStore()
    const userData = computed(() => {
        return store.state.auth.userLogin
    })
</script>

<template>
    <div class="d-flex mt-4">
        <div class="pe-4 me-4">
            <p>Firstname</p>
            <p>Last Name</p>
            <p>Username</p>
            <p>Email</p>
        </div>
        <div class="ps-4 ms-4">
            <p>{{ userData.firstname }}</p>
            <p>{{ userData.lastname }}</p>
            <p>{{ userData.username }}</p>
            <p>{{ userData.email }}</p>
        </div>
    </div>
</template>