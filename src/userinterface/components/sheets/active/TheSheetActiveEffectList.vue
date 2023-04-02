<script setup lang="ts">
import type { EffectSchema } from '@/schema/SchemaTypes';
import { useStore } from '@/userinterface/Store';
import { mapStores } from 'pinia';
import ListItem from './SheetActiveEffectListItem.vue';
import { getShortName } from "@/util/GeneralUtils";
import { Defaults } from '@/Defaults';
 
const store = useStore()

</script>

<script lang="ts">

export default {
    components: { ListItem },
    data(){return {
        shadow: { ...Defaults.Arrays.active.maluslist } as EffectSchema
    }},

    computed: {
        ...mapStores(useStore),
    },

    methods: {
        // Event: When the shadow element changes
        onShadowChange(){
            // Ensures that the element is not empty
            if(this.shadow.name.trim().length <= 0)
                return;

            // Creates the new element
            this.baseStore.active_registerEffect(this.shadow);

            // Resets the shadow element
            this.shadow = { ...Defaults.Arrays.active.maluslist } as EffectSchema
        },

        // Event: Whenever any normal element changes
        onNormalChange(item: EffectSchema){
            // Checks if the element's name is now empty
            if(item.name.trim().length <= 0){
                // Removes the item
                this.baseStore.active_removeItem(item);
            }
        },

        // Event: When an item requests a delete
        onItemRequestDelete(item: EffectSchema){

            // Askes the user if the item should really be deleted
            var shouldDelete = confirm(`Möchtest du den Effekt '${getShortName(item.name, 20)}' wirklich löschen?`);
            
            if(!shouldDelete)
                return;

            // Deletes the item
            this.baseStore.active_removeItem(item);
        },

        // Event: When an item wants to move into a direction
        onItemMoveRequest(item: EffectSchema, up: boolean){
            // Gets the index
            var index: number = this.baseStore.active.maluslist.indexOf(item);

            // Gets the next element's index
            var swapIndex = index + (up ? 1 : -1);

            // Ensures there is an item to swap with
            if(swapIndex < 0 || swapIndex >= this.baseStore.active.maluslist.length)
                return;

            // Gets the item to swap
            var swapItem = this.baseStore.active.maluslist[swapIndex];

            // Store both items into their new position
            this.baseStore.active.maluslist[swapIndex] = item;
            this.baseStore.active.maluslist[index] = swapItem;
        },
    }
}

</script>

<template>
<div class="effectlist">

    <!-- Renders all normal items -->
    <ListItem
        v-for="itm, idx in store.active.maluslist" :key="idx"
        
        @change="onNormalChange(itm)"
        @delete="onItemRequestDelete(itm)"
        @move="onItemMoveRequest(itm, $event)"

        :item="itm"
        />
    
    <!-- Renders the shadow item -->
    <ListItem @change="onShadowChange" :isShadow="true" :item="shadow" />

</div>
</template>

<style scoped lang="scss">

.effectlist{
    margin: 10px;

    &>div{
        margin-bottom: .5rem;
    }
}
</style>
