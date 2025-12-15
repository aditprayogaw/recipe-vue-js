<script setup>
    defineProps({
        identity: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: false
        },
        label: {
            type: String,
            required: true
        },
        readonly: {
            type: String,
            required: false,
            default: "0"
        },
        isImage: {
            type: Boolean,
            required: false,
            default: false
        },
        modelValue: {
            type: [String, Number],
            required: false,
            default: ""
        }
    })

    const emit = defineEmits(['update:modelValue', 'keyInput'])
</script>

<template>
    <div :class="{'d-none': isImage}">
        <label :for="identity" class="fw-semibold">
            {{ label }} <span style="color: #cb3a31">*</span>
        </label>
        
        <input 
            class="form-control"
            :type="type"
            :id="identity"
            :placeholder="placeholder"
            :readonly="readonly === '1'"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            @keyup="$emit('keyInput', $event.target.value)"
            @focus="$emit('totalTimeFocus', $event.target.value)"
        />
    </div>
    
    <div v-if="isImage">
        <label :for="identity" class="fw-semibold">
            {{ label }} <span style="color: #cb3a31">*</span>
        </label>
        <slot></slot>
        <input 
            type="file" 
            class="d-none"
            :id="identity"
            @change="$emit('update:modelValue', $event)" 
        /> 
    </div>
</template>

 
<style scoped>
.input-wrapper {
    padding: 0.375rem 0.75rem;
    width: 200px;
    text-align: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    border: 1px solid #ced4da;
    background-color: #ced4da;
    border-radius: 0.375rem;
    margin-bottom: 10px;
    transition: all 1s ease;
}

.input-wrapper:hover {
    background-color: #b9bec3;
}

.file-input {
    cursor: pointer;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 99;
    font-size: 50px;
    opacity: 0;
}
</style>