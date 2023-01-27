<script setup lang="ts">
import { WeaponType, type WeaponSchema } from '@/schema/SchemaTypes';
import type { PropType } from 'vue';
import GrowInput from '../../utils/GrowInput.vue';
import Icon from '../../utils/Icon.vue';
import Onefield from '../../utils/Onefield.vue';
import Seperator from '../../utils/OnefieldSeperator.vue';
import InventoryHeaderBar from './InventoryHeaderBar.vue';
</script>

<script lang="ts">

// Mappings from weapon-types to icons
const WEAPON_TYPE_ICON : {[x in WeaponType]: string} = {
    [WeaponType.MELEE_DULL]: "policestick",
    [WeaponType.MELEE_SHARP]: "sword",
    [WeaponType.ONE_HAND]: "pistole",
    [WeaponType.TWO_HAND]: "sniper"
}

export default {
    components: { InventoryHeaderBar, Onefield, OnefieldSeperator: Seperator, Icon, GrowInput },

    props: {
        item: {
            type: Object as PropType<WeaponSchema>,
            required: true
        },

        isShadow: {
            type: Boolean,
            default: false
        }
    },

    emits: ["change", "lock", "delete", "equip", "typeChange"],

    computed: {
        getTypeIcon(){
            return WEAPON_TYPE_ICON[this.item.type];
        },

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
    <div class="icon">
        <Icon @click="$emit('typeChange')" :name="getTypeIcon" />
        <Seperator/>
    </div>
    <div class="type" >
        <GrowInput v-model="item.category" placeholder="Type"/>
        <Seperator/>
    </div>
    <div class="name" >
        <input @change="$emit('change')" v-model="item.name" type="text">
        <Seperator/>
    </div>
    <div class="damage">
        <GrowInput v-model="item.damage" placeholder="2W6" @change="$emit('change')" type="text" maxlength="20"/>
        <Seperator/>
    </div>
    <div class="actions">
        <Icon @click="$emit('lock')" :name="item.locked ? 'locked' : 'unlocked'" />
        <Icon @click="$emit('equip')" name="equip" />
        <Icon @click="$emit('delete')" name="delete" />
    </div>
</Onefield>
</template>

<style scoped lang="scss">
*{
    display: flex;
    justify-content: center;
    align-items: center;
}

.type, .damage{
    max-width: 12rem;
    align-items: unset;
    .grow-input{
        margin: 5px;

        :deep(*){
            font-size: 1.2rem;
        }
    }
}

.name{
    flex-grow: 1;
    input{
        
        outline: none;
        font-size: 1.2rem;
        padding: .2rem .4rem;
        width: 100%;
        border: none;
    }
}

i{
    width: 1.5rem;
    height: 1.5rem;
    transition: .5s;
    cursor: pointer;
}

.icon {
    display: flex;
    justify-content: center;
    align-items: center;

    i{
        margin: .3rem;
        margin-right: .38rem;
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
