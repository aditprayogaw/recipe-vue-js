<script setup>
    import BaseInput from '../ui/BaseInput.vue';
    import BaseButton from '../ui/BaseButton.vue';
    import BaseTextArea from '../ui/BaseTextArea.vue';
    import BaseSelect from '../ui/BaseSelect.vue';
    import { reactive, ref } from 'vue';

    const store = useStore();
    const router = useRouter();

    const addNewRecipe = async () => {
        await store.dispatch("recipe/addNewRecipe", recipeData);
        router.push("/user/user-recipe");
    }

    const recipeData = reactive({
        imageLink: '',
        name: '',
        description: '',
        category: '',
        prepTime: 0,
        cookTime: 0,
        totalTime: 0,
        ingredients: [],
        directions: []
    });

    const ingredientCount = ref(1);
    const directionCount = ref(1);
    const addIngredient = () => {
        ingredientCount.value++;
    };

    const deleteIngredient = (index) => {
        recipeData.ingredients.splice(index, 1);
        ingredientCount.value--;
    };

    const deleteDirection = (index) => {
        recipeData.directions.splice(index, 1);
        directionCount.value--;
    };
    
    const props = defineProps({
        recipeData: { type: Object, required: true }
    })

    const totalTime = () => {
        recipeData.totalTime = parseInt(recipeData.prepTime) + parseInt(recipeData.cookTime);
    };

    const checkImage = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.addEventListener('load', () => {
            recipeData.imageLink = reader.result;
        });
    };

    const emit = defineEmits(['add-ingredient', 'delete-ingredient', 'add-direction', 'delete-direction', 'check-image', 'submit', 'cancel'])
</script>

<template>
    <li class="list-group-item">
        <form @submit.prevent="addNewRecipe">
            <div>
                <p class="my-3 fs-5 fw-semibold">General Information</p>
                <div>
                    <div class="mb-3"> 
                        <base-input 
                            type="file" 
                            identity="recipeImage" 
                            label="Photo Recipe" 
                            isImage="true"
                            @input="checkImage"
                        >
                            <div class="border p-1 mt-2 rounded-circle">
                                <img 
                                    :src="recipeData.imageLink || 'https://via.placeholder.com/150'" 
                                    class="rounded-circle" 
                                    width="140px" 
                                    height="140px" 
                                    style="object-fit: cover"
                                />
                            </div>
                            <div class="text-center" style="transform: translateY(-24px);">
                                <i class="fa-solid fa-camera fs-5 p-2 rounded-circle bg-white"></i>
                            </div>
                        </base-input>
                    </div>

                    <div class="mb-3"> 
                        <base-input 
                            type="text" 
                            identity="recipeTitle" 
                            placeholder="Give your recipe a title" 
                            label="Recipe Title"
                            v-model="recipeData.name"
                        ></base-input>
                    </div>

                    <div class="mb-3"> 
                        <base-text-area 
                            identity="recipeDescription" 
                            label="Description"
                            placeholder="Share story behind recipe and what is make it special" 
                            v-model="recipeData.description"
                        ></base-text-area>
                    </div>

                    <div class="mb-3"> 
                        <label for="recipeCategory" class="fw-semibold">Category <span style="color: #cb3a31">*</span></label>
                        <base-select 
                            id="recipeCategory"
                            :data="['Breakfast', 'Lunch', 'Dinner', 'Meals', 'Snacks']"
                            v-model="recipeData.category"
                        ></base-select>
                    </div>
                </div>
            </div>
            <div class="border-top py-1">
                <p class="my-3 fs-5 fw-semibold">Time Setting</p>
                <div>
                    <div class="mb-3"> 
                        <base-input 
                            type="number" 
                            identity="prepTime" 
                            placeholder="0" 
                            label="Prep Time"
                            v-model="recipeData.prepTime"
                        ></base-input>
                    </div>

                    <div class="mb-3"> 
                        <base-input 
                            type="number" 
                            identity="cookTime" 
                            placeholder="0" 
                            label="Cook Time"
                            v-model="recipeData.cookTime"
                        ></base-input>
                    </div>

                    <div class="mb-3"> 
                         <base-input 
                            type="number" 
                            identity="totalTime" 
                            placeholder="0" 
                            label="Total Time"
                            v-model="recipeData.totalTime"
                            @totalTimeFocus="totalTime"
                            readonly="1"
                        ></base-input>
                    </div>
                </div>
            </div>
            <div class="border-top py-1">
                <p class="my-3 fs-5 fw-semibold">Ingredients</p>
                <p>
                    Enter one ingredient per line. Include the quantity (i.e. cups,
                    tablespoons) and any special preparation (i.e. sifted, softened,
                    chopped). Use optional headers to organize the different parts of the
                    recipe (i.e. Cake, Frosting, Dressing).
                </p>
                <div>
                    <div class="mb-3 row" v-for="count in ingredientCount" :key="count">
                        <div class="col-lg-11 col-11"> 
                            <base-input 
                                type="text" 
                                identity="ingredient" 
                                placeholder="Ex: 1 cup sugar"
                                v-model="recipeData.ingredients[count - 1]"
                            ></base-input>
                        </div>
                        <div class="col-lg-1 col-1 col-form-label align-self-end delete-ingredient"
                            style="color: #cb3a31; cursor: pointer;" 
                            v-if="ingredientCount > 1" @click="deleteIngredient(count - 1)">
                            <i class="fa-regular fa-trash-can px-1"></i><span class="d-none d-md-inline">Delete</span>
                        </div>
                    </div>
                </div>
                <base-button 
                    class="new-ingredient-btn px-3 py-2" 
                    type="button" 
                    @clickButton="addIngredient">
                    <i class="fa-solid fa-plus me-2"></i>Add More
                </base-button>
            </div>
            <div class="border-top my-3">
                <p class="my-3 fs-5 fw-semibold">Directions</p>
                <p>
                    Explain how to make your recipe, including oven temperatures, baking
                    or cooking times, and pan sizes, etc. Use optional headers to organize
                    the different parts of the recipe
                </p>
                <div>
                    <div class="mb-3 row" v-for="(item, index) in recipeData.directions" :key="index">
                        <div class="col-lg-11 col-11">
                             <base-input 
                                type="text" 
                                identity="direction" 
                                placeholder="Ex: 1 cup sugar"
                                v-model="item.value"
                            ></base-input>
                        </div>
                        <div class="col-lg-1 col-1 col-form-label align-self-end delete-ingredient"
                            style="color: #cb3a31; cursor: pointer;" 
                            v-if="directionCount > 1" @click="deleteDirection(count - 1)">
                            <i class="fa-regular fa-trash-can px-1"></i><span class="d-none d-md-inline">Delete</span>
                        </div>
                    </div>
                </div>
                <base-button 
                    class="new-ingredient-btn px-3 py-2" 
                    type="button" 
                    @click="$emit('add-direction')">
                    <i class="fa-solid fa-plus me-2"></i>Add More
                </base-button>
            </div>
            <div class="border-top py-3 d-flex my-4 justify-content-end">
                <base-button 
                    class="cancel-btn px-3 py-2 ms-1" 
                    @click="$emit('cancel')">
                    Cancel
                </base-button>

                <base-button 
                    class="submit-recipe-btn px-3 py-2 ms-1" 
                    @click="$emit('submit')">
                    Submit
                </base-button>
            </div>
        </form>
    </li>
</template>

<style scoped>
.image {
    width: 150px;
    height: 150px;
    object-fit: cover;
}
</style>