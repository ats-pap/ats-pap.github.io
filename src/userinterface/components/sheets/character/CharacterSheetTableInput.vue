<script setup lang="ts">
import { useStore } from '@/userinterface/Store';
import type {CharacterSchema} from "@/schema/SchemaTypes";

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
            type: String,
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
        }
    },
}

</script>

<template>  
<div class="field">
    <label :for="'character-'+keyName">{{ title }}</label>
    <input v-model="store.character[keyName as keyof CharacterSchema]" :id="'character-'+keyName" type="text" :placeholder="placeholder" :name="keyName"/>
</div>
</template>

<style scoped lang="scss">
</style>
