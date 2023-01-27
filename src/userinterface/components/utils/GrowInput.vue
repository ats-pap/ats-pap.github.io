<script setup lang="ts">
import ValidatedInput from './ValidatedInput.vue';


</script>

<script lang="ts">

export default {
    props: {
        placeholder: String,
        type: String,
        id: String,
        min: String,
        max: String,
        classList: String,
        maxlength: String,
        modelValue: [String, Number]
    },
    emits: ["update:modelValue", "change"],
    components: { ValidatedInput }
}

</script>

<template>
<div :class="'grow-input '+type">
    <span tabindex="-1">{{ modelValue }}</span>
    <ValidatedInput
        :maxlength="maxlength" :placeholder="placeholder"
        :min="min" :max="max"
        :id="id" :type="type"
        :classList="classList"
        :value="modelValue"
        @input="$emit('update:modelValue', $event)"
        @change="$emit('change')"
        />
</div>
</template>

<style scoped lang="scss">
.grow-input{
    position: relative;
    min-width: 2rem;

    &.number span::after{
        content: '';
        width: 25px;
        display: inline-grid;
    }

    input,span{
        font-size: 1.4rem;
    }

    input{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        border: none;
        outline: none;
        text-align: center;
    }

    span{
        user-select: none !important;
        height: 0px;
        display: inline-block;
        overflow-y: hidden;
    }
}
</style>
