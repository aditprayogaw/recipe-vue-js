<script setup>
    import SearchMenu from "@/components/header/SearchMenu.vue";
    import SignupMenu from "@/components/header/SignupMenu.vue";
</script>

<template>
    <div
        class="header__navbar row
        justify-content-between align-items-center"
        style="width: 450px"
    >
        <SearchMenu />
        <SignupMenu />
    </div>

</template>
