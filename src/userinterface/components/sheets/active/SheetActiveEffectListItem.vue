<script setup lang="ts">
import { EffectType, type EffectSchema } from '@/schema/SchemaTypes';
import { changeToNext } from '@/util/GeneralUtils';
import type { PropType } from 'vue';
import GrowInput from '../../utils/GrowInput.vue';
import Icon from '../../utils/Icon.vue';
import Onefield from '../../utils/Onefield.vue';
import Seperator from '../../utils/OnefieldSeperator.vue';

</script>

<script lang="ts">

// Mappings from effect-types to icons
const EFFECT_ICON : {[x in EffectType]: string} = {
    [EffectType.BONUS]: "bonus",
    [EffectType.MALUS]: "malus",
    [EffectType.PROPERTY]: "property",
    [EffectType.MUTATION]: "mutation"
}

// Mappings from effect-types to names
const EFFECT_NAMES: {[x in EffectType]: string} = {
    [EffectType.BONUS]: "Bonus",
    [EffectType.MALUS]: "Malus",
    [EffectType.PROPERTY]: "Eigenschaft",
    [EffectType.MUTATION]: "Mutation"
}

export default {
    components: { Icon, Onefield, OnefieldSeperator: Seperator, GrowInput },
    
    props:{
        // Item to bind the properties to
        item: {
            type: Object as PropType<EffectSchema>,
            required: true
        },

        // If this item should be displayed as a shadow
        isShadow: {
            type: Boolean,
            default: false
        },
    },

    computed: {
        getTypeName(){
            return EFFECT_NAMES[this.item.type || EffectType.MALUS]
        },

        getTypeIcon(){
            return EFFECT_ICON[this.item.type || EffectType.MALUS]
        }
    },

    methods: {
        // Event: When the icon gets clicked
        onIconClicked(){
            // Switches to the next type
            this.item.type = changeToNext(EffectType, this.item.type || EffectType.MALUS);
        }
    },

    emits: ["change", "delete", "move"]
}

</script>

<template>
<Onefield :classList="isShadow ? 'shadow' : ''">
    <div @click="onIconClicked" :data-type="getTypeIcon" class="type">
        <Icon :name="getTypeIcon"/>
        <span>{{ getTypeName }}</span>
        <Seperator/>
    </div>
    <div class="name">
        <GrowInput @change="$emit('change')" v-model="item.name" placeholder="Name" />
        <Seperator/>
    </div>
    <div class="effect">
        <input placeholder="Tatsächlicher Effekt" value="">
        <Seperator/>
    </div>
    <div class="delete">
        <Icon @click="$emit('move', true)" name="arrow-up"/>
        <Icon @click="$emit('move', false)" name="arrow-down"/>
        <Icon @click="$emit('delete')" name="delete"/>
    </div>
</Onefield>
</template>

<style scoped lang="scss">

@import "@/assets/styles/Settings.scss";

.onefield {
    &:first-child .delete .ic-arrow-down, &:nth-last-child(2) .delete .ic-arrow-up {
        filter: opacity(0.5);
    }
}

*{
    display: flex;

    &:last-child{
        margin-bottom: 0;
    }
}

.shadow{

    &:deep(.onefield){
        border-color: $disabledColor;
    }

    .delete i{
        cursor: not-allowed;
    }
    i, .type span{
        filter: opacity(.5);
    }
}

.name{
    display: flex;

    :deep(.grow-input) {
        max-width: 15rem;
        min-width: 5rem;

        * {
            font-size: 1.2rem;
        }

        span{
            padding: 0 5px;
        }

        input{
            padding: .3rem;
        }
    }
}

.effect{
    flex-grow: 1;
    flex-shrink: 1;
    min-width: 5rem;

    input{
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        font-size: 1.2rem;
        padding: .2rem .4rem;
    }
}

.delete, .type{
    display: flex;
    align-items: center;
}

.type{
    *{
        cursor: pointer;
    }

    span{
        margin-right: .5rem;
    }

    &[data-type="bonus"] span{
        color: green;
    }
    &[data-type="malus"] span{
        color: red;
    }
    &[data-type="property"] span{
        color: rgb(6, 101, 225);
    }
    &[data-type="mutation"] span{
        color: #a4a203;
    }
}

.type i{
    cursor: pointer;
}

i{
    width: 1.5rem;
    height:1.5rem;
    margin: 0 .2rem;
    cursor: pointer;
    transition: .5s;
}
</style>
