<script setup lang="ts">
import { Defaults } from '@/Defaults';
import type { SkillItemSchema, SkillTableCollectionSchema } from '@/schema/SchemaTypes';
import { useStore } from '@/userinterface/Store';
import { mapStores } from 'pinia';
import type { PropType } from 'vue';
import SkillSheetTableBodyItem from './SkillSheetTableBodyItem.vue';

</script>

<script lang="ts">

export default {
    
    props: {
        // Name of the property when saving / loading
        tableName: {
            required: true,
            type: String as PropType<keyof SkillTableCollectionSchema>,
        },

        defaultPlaceholder: {
            type: String,
            required: true
        }
    },

    data(){return {
        shadow: { ...Defaults.Arrays.skills.items } as SkillItemSchema
    }},

    computed: {
        ...mapStores(useStore),
        
        getItems(){
            return this.baseStore.skills.tables[this.tableName].items;
        }
    },

    methods: {
         // Event: When the shadow element changes
         onShadowChange(){
            // Ensures that the element is not empty
            if(this.shadow.name.trim().length <= 0)
                return;

            // Creates the new element
            this.baseStore.skills_registerNewItem(this.tableName, this.shadow);

            // Resets the shadow element
            this.shadow = { ...Defaults.Arrays.skills.items }
        },

        // Event: Whenever any normal element changes
        onNormalChange(item: SkillItemSchema){
            // Checks if the element's name is now empty
            if(item.name.trim().length <= 0){
                // Removes the item
                this.baseStore.skills_removeItem(this.tableName, item);
            }
        }
    },

    components: { SkillSheetTableBodyItem }
}

</script>

<template>
<table>
    <thead>
        <tr>

            <!--
                The empty header-elements are placeholders for
                the seperator elements inside the item-fields
            -->

            <th>Name</th>
            <th class="header-seperator"></th>
            <th>Wert</th>
            <th class="header-seperator"></th>
            <th>+/-</th>
            <th class="header-seperator"></th>
            <th>=</th>
        </tr>
    </thead>
    <tbody>
        <!-- List with actual items -->
        <SkillSheetTableBodyItem @change="onNormalChange(itm)" :tableName="tableName" v-for="itm, value of getItems" :item="itm" :key="value" :placeholder="defaultPlaceholder" />

        <!-- Shadow item -->
        <SkillSheetTableBodyItem @change="onShadowChange" :tableName="tableName" :item="shadow" :isShadow="true" :placeholder="defaultPlaceholder" />
    </tbody>
</table>
</template>

<style scoped lang="scss">

table{
    width: 100%;
    border-spacing: 0 10px;

    thead{
        font-size: 1.2rem;
        
        th.header-seperator{
            padding: 0 !important;
        }
    }

    td{
        padding: 0 !important;
        vertical-align: top;
    }

    // TODO: Import all these css values into to correct item once it exists

    .value, .bon-mal{
        
        .grow-input{
            margin: 0 .3rem;
            span{
                padding-right: 1rem;
            }
        }
    }

    .bon-mal input{
        color: rgb(1, 176, 1);
    }

    .result{
        text-align: center;
        font-size: 1.5rem;

        span{
            padding: .2rem;
        }
    }
}
</style>
