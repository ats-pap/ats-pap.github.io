<script setup lang="ts">
import { useStore } from '@/userinterface/Store';
import GrowInput from '../../utils/GrowInput.vue';
import Onefield from '../../utils/Onefield.vue';
import Seperator from "../../utils/OnefieldSeperator.vue"
import type { SkillItemSchema, SkillTableCollectionSchema } from '@/schema/SchemaTypes';
import type { PropType } from 'vue';

</script>

<script lang="ts">

export default {
    components: { GrowInput, Onefield, Seperator },

    props: {

        // Name of the property when saving / loading
        tableName: {
            required: true,
            type: String as PropType<keyof SkillTableCollectionSchema>,
        },

        // Item to bind the properties to
        item: {
            type: Object as PropType<SkillItemSchema>,
            required: true
        },

        // If this item should be displayed as a shadow
        isShadow: {
            type: Boolean,
            default: false
        },

        // Placeholder for the name field
        placeholder: {
            type: String,
            required: true
        }
    },

    data(){ return {
        shadow: {
            name: "",
            points: 0,
            bonusPoints: 0
        } as SkillItemSchema
    }},

    computed: {
        getResult(){
            return (this.item.points) + (this.item.bonusPoints);
        }
    },

    emits: ["change"]
}

</script>

<template>
<Onefield :classList="isShadow ? 'shadow' : ''" :is-table="true">
    <td class="name">
        <input :placeholder="placeholder" @change="$emit('change')" v-model="item.name" type="text">
    </td>
    
    <td><Seperator /></td>

    <td class="value">
        <GrowInput maxlength="3" type="number" v-model.number="item.points" min="0" max="999"></GrowInput>
    </td>

    <td><Seperator /></td>

    <td :class="'bon-mal '+(item.bonusPoints < 0 ? 'negative' : '')" >
        <GrowInput maxlength="4" type="number" v-model.number="item.bonusPoints" min="-999" max="999"></GrowInput>
    </td>

    <td><Seperator /></td>

    <td class="result">
        <span>{{ getResult }}</span>
    </td>
</Onefield>
</template>

<style scoped lang="scss">

@import "@/assets/styles/Settings.scss";

// Applies shadow effect if the field is a shadow field
.shadow :deep(*){
    border-color: gray !important;
    color: gray;
}

// Applies the border and radius to the line
td{
    padding: 0;
    border-top: $fieldBorder;
    border-bottom: $fieldBorder;

    &:first-child{
        border-left: $fieldBorder;
        border-top-left-radius: $fieldBorderRadius;
        border-bottom-left-radius: $fieldBorderRadius;
    }
    &:last-child{
        border-right: $fieldBorder;
        border-top-right-radius: $fieldBorderRadius;
        border-bottom-right-radius: $fieldBorderRadius;
    }
}

.grow-input :deep(input), input {
    font-size: 1.2rem;
}

.name{

    input{
        width: 100%;
        height: 100%;
        outline: none;
        padding: .2rem .4rem;
        border: none;
    }
}

.value, .bon-mal{
    
    .grow-input{
        margin: 0 .3rem;
        span{
            padding-right: 1rem;
        }
    }
}

.bon-mal{

    :deep(input){
        color: rgb(1, 176, 1);
    }
    &.negative :deep(input){
        color: $negativeColor;
    }
}
.result{
    text-align: center;
    font-size: 1.5rem;

    span{
        padding: .2rem;
    }
}
</style>
