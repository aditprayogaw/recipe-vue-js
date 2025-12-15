<script setup>
    import { onMounted } from 'vue'
    import { useRoute } from 'vue-router';
    import { useStore } from 'vuex'
    import RecipeDescription from './RecipeDescription.vue'
    import RecipeIngredients from './RecipeIngredients.vue'
    import RecipeDirections from './RecipeDirections.vue'

    const route = useRoute();
    const store = useStore();

    onMounted(async () => {
        await store.dispatch('recipe/getRecipeDetail', route.params.id);
    });
</script>

<template>
    <div class="col-12 col-sm-8">
        <recipe-description :recipeDetail="recipeDetail"></recipe-description>
        <recipe-ingredients></recipe-ingredients>
        <recipe-directions></recipe-directions>
    </div>
</template>