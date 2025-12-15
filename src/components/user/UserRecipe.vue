<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import UserRecipeCard from "./UserRecipeCard.vue";

const store = useStore();

const recipes = computed(() => {
    const allRecipe = store.state.recipe.recipes;
    const userId = store.state.auth.userLogin.userId;
    return allRecipe.filter((recipe) => recipe.userId === userId);
});

const deleteRecipe = async (id) => {
    await store.dispatch("recipe/deleteRecipe", id)
}
</script>

<template>
    <li class="list-group-item">
        <p class="mt-2 mb-4 fs-5 fw-semibold">Recipe</p>
        <div class="row">
            <user-recipe-card 
            v-for="recipe in recipes" 
            :key="recipe.id" 
            :recipe="recipe" 
            :buttonName="[ 'Delete', 'Edit' ]" 
            @btnRemove="deleteRecipe(recipe.id)"
            >
                <p>{{ new Date (recipe.createdAt) .toDateString() }}</p>
            </user-recipe-card>
        </div>
    </li>
</template>