<script setup lang="ts">
import GrowInput from '../../utils/GrowInput.vue';
import Onefield from '../../utils/Onefield.vue';
import InventoryHeaderBar from './InventoryHeaderBar.vue';
import type { ItemSchema } from "@/schema/SchemaTypes";
import type { PropType } from 'vue';
import Icon from '../../utils/Icon.vue';
import Seperator from '../../utils/OnefieldSeperator.vue';

</script>

<script lang="ts">

export default {
    components: { InventoryHeaderBar, Onefield, GrowInput, Icon, OnefieldSeperator: Seperator },
    props: {
        item: {
            type: Object as PropType<ItemSchema>,
            required: true
        },

        isShadow: {
            type: Boolean,
            default: false
        }
    },

    emits: ["change", "lock", "delete", "equip"],

    computed: {
        getBaseClasses(){
            if(this.isShadow) return "shadow";
            if(this.item.locked) return "locked";
            return "";
        }
    }
}

</script>

<template>

<Onefield :classList="getBaseClasses">
    <div class="amt">
        <GrowInput v-model.number="item.amount" maxlength="5" type="number" value="1" min="1" max="99999" />
        <span>x</span>
    </div>
    <div class="name" >
        <input @change="$emit('change')" v-model="item.name" type="text">
        <Seperator />
    </div>
    <div class="weight">
        <GrowInput v-model.number="item.weight" maxlength="5" type="number" value="1" min="0" max="99999" />
        <span>g</span>
        <Seperator />
    </div>
    <div class="actions">
        <Icon @click="$emit('lock')" :name="item.locked ? 'locked' : 'unlocked'" />
        <Icon @click="$emit('equip')" name="equip" />
        <Icon @click="$emit('delete')" name="delete" />
    </div>
</Onefield>

</template>

<style scoped lang="scss">

.amt, .weight{
    display: flex;
    :deep(.grow-input){
        min-width: 3rem;
    }

    :deep(.grow-input){
        min-width: 3rem;
    }
}

.name{
    display: flex;
    flex-grow: 1;

    input {
        outline: none;
        font-size: 1.2rem;
        padding: .2rem .4rem;
        width: 100%;
        border: none;
    }
}

span{
    font-family: "NewTelegraph";
    font-size: 1.2rem;
    margin: 0 .4rem;
    align-self: center;
}

.actions {
    display: flex;
    
    i{
        width: 2rem;
        height: 2rem;
        cursor: pointer;
        width: 1.5rem;
        height: 1.5rem;
        transition: .5s;
    }
}
.shadow i {
    filter: opacity(0.5);
    cursor: not-allowed;
}

.locked {
    i.ic-equip {
        filter: opacity(0.5);
        cursor: not-allowed;
    }
}

</style>
