<script setup lang="ts">
import { useStore } from '@/userinterface/Store';
import type {CharacterSchema} from "@/schema/SchemaTypes";
import type { PropType } from 'vue';

</script>

<script lang="ts">

export default {

    data(){return{
        store: useStore()
    }},

    props: {
        // Name of the property when saving / loading
        keyName: {
            required: true,
            type: String as PropType<keyof CharacterSchema>,
        },

        // Placeholder text
        placeholder: {
            required: true,
            type: String,
        },

        // Text above the field
        title: {
            required: true,
            type: String,
        },

        useTextfield: {
            type: Boolean,
            default: false
        }
    },
}

</script>

<template>  
<div class="field" :style="{ gridArea: keyName }">
    <label :for="'character-'+keyName">{{ title }}</label>
    <input v-if="!useTextfield" v-model="store.character[keyName]" :id="'character-'+keyName" type="text" :placeholder="placeholder"/>
    <textarea v-else v-model="store.character[keyName]" :id="'character-'+keyName" type="text" :placeholder="placeholder"></textarea>
</div>
</template>

<style scoped lang="scss">
textarea {
    width:100%;
    height:100%;
    resize: none;
    outline: none;
    padding: 0.8rem;
    border: 0;
    font-size: 1.4rem;
}
</style>
