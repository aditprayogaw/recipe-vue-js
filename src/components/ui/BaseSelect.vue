<script setup>
    defineProps({
        data: { type: Array, required: true },
        id: { type: String, required: true },
        modelValue: { type: [String, Number], default: "" }
    })
</script>

<template>
    <select
        class="form-select"
        :id="id"
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
    >
        <option value="" disabled selected>Select Category</option>
        <option v-for="(item, index) in data" :key="index" :value="item">
            {{ item }}
        </option>
    </select>
</template>