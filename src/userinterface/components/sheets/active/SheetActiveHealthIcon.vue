<script setup lang="ts">
import Onefield from '../../utils/Onefield.vue';
import GrowInput from '../../utils/GrowInput.vue';
import Icon from '../../utils/Icon.vue';
import Seperator from "../../utils/OnefieldSeperator.vue"
import { useStore } from '@/userinterface/Store';
import type { PropType } from 'vue';
import type { ActiveSchemaHealth } from "@/schema/SchemaTypes";

const store = useStore();

</script>

<script lang="ts">

export default {
    components: { Onefield, GrowInput, Icon, Seperator },
    props: {
        icon: {
            type: String,
            required: true
        },
        default:{
            type: String,
            default: "0"
        },
        name: {
            type: String,
            required: true
        },

        min: {
            type: String,
            default: "1"
        },

        keyName: {
            type: String as PropType<keyof ActiveSchemaHealth>,
            required: true
        }
    }
}

</script>

<template>
<div class="healthicon">
    <Icon :name="icon"></Icon>
    <GrowInput placeholder="0" maxlength="3" type="number" :min="min" max="999" v-model.number="store.active.health[keyName]"></GrowInput>
    <span>{{ name }}</span>
</div>
</template>

<style scoped lang="scss">

.healthicon{
    margin: 0 1rem;
    display: inline-flex;
    flex-direction: column;
    align-items: center;

    span{
        font-size: 1.3rem;
    }
    
    i{
        width: 2rem;
        height: 2rem;
    }
    
    .grow-input{
        border-bottom: .2rem solid black;
        &,&>*{
            font-size: 1.4rem;
        }
    }
}

</style>
