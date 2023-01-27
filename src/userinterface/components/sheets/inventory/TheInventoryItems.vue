<script setup lang="ts">
import type { ItemSchema } from '@/schema/SchemaTypes';
import { useStore } from '@/userinterface/Store';
import { getShortName } from '@/util/GeneralUtils';
import { mapStores } from 'pinia';
import InventoryHeaderBar from './InventoryHeaderBar.vue';
import Item from "./InventoryItemsItem.vue";

const store = useStore();

</script>

<script lang="ts">

export default {
    components: { InventoryHeaderBar },

    data(){return {
        shadow: {
            amount: 1,
            locked: false,
            name: ""
        } as ItemSchema
    }},

    computed: {
        ...mapStores(useStore),

        getItemAmount(){
            return this.baseStore.inventory.items.length;
        },

        getUnLockedItemAmount(){
            return this.baseStore.inventory.items.filter(itm=>!itm.locked).length;
        }
    },

    methods: {
        // Event: When the shadow element changes
        onShadowChange(){
            // Ensures that the element is not empty
            if(this.shadow.name.trim().length <= 0)
                return;

            // Creates the new element
            this.baseStore.inventory_registerItem(this.shadow);

            // Resets the shadow element
            this.shadow = {
                amount: 1,
                locked: false,
                name: ""
            }
        },

        // Event: Whenever any normal element changes
        onNormalChange(item: ItemSchema){
            // Checks if the element's name is now empty
            if(item.name.trim().length <= 0){
                // Removes the item
                this.baseStore.inventory_removeItem(item);
            }
        },


        // Event: When the lock icon get's clicked
        onLockRequest(item: ItemSchema){
            // Toggles the locked state
            item.locked = !item.locked;
        },

        // Event: When the equip icon get's clicked
        onEquipRequest(item: ItemSchema){
            if(item.locked) return;

            // Sets the item as the held
            this.baseStore.active.item = item.name;
        },

        // Event: When the delete icon get's clicked
        onDeleteRequest(item: ItemSchema){

             // Askes the user if the item shall be deleted
            var shouldDelete = confirm(`Möchtest du das Item '${getShortName(item.name, 20)}' wirklich löschen?`);
            
            if(!shouldDelete)
                return;

            // Deletes the item
            this.baseStore.inventory_removeItem(item);
        }
    }
}

</script>

<template>
<InventoryHeaderBar icon="items" title="Items" :current="getUnLockedItemAmount" :max="getItemAmount" />

<div class="items">

    <!-- All other items -->
    <Item
        v-for="itm, idx in store.inventory.items" :key="idx"
        
        :item="itm"
        
        @change="onNormalChange(itm)"
        @delete="onDeleteRequest(itm)"
        @equip="onEquipRequest(itm)"
        @lock="onLockRequest(itm)"
        />

    <!-- Shadow item -->
    <Item :isShadow="true" :item="shadow" @change="onShadowChange" />
</div>
</template>

<style scoped lang="scss">
.items{
    display: grid;
    grid-template-areas: "a a";
    grid-gap: .5rem 1rem;
    grid-template-columns: minmax(50%, 50%);

    :deep(.onefield.locked){
        border-color: #d0d0d0;
    }
}
</style>
