<script setup>
    import RecipeFormHeader from "./RecipeFormHeader.vue"
    import RecipeFormBody from "./RecipeFormBody.vue"

    defineProps({
        isEdit: { type: Boolean, default: false }
    })
</script>

<template>
    <ul class="list-group">
        <recipe-form-header></recipe-form-header>
        <recipe-form-body 
            :recipeData="recipeData"
            :isEdit="isEdit" 
            @add-ingredient="addIngredient"
            @delete-ingredient="deleteIngredient"
            @add-direction="addDirection"
            @delete-direction="deleteDirection"
            @check-image="checkImage"
            @submit="submitRecipe"
            @cancel="cancelAction"
        ></recipe-form-body>
    </ul>
</template>

