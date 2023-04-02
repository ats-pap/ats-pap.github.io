<script setup lang="ts">
import { Defaults } from '@/Defaults';
import { WeaponType, type WeaponSchema } from '@/schema/SchemaTypes';
import { useStore } from '@/userinterface/Store';
import { changeToNext, getShortName } from '@/util/GeneralUtils';
import { mapStores } from 'pinia';
import InventoryHeaderBar from './InventoryHeaderBar.vue';
import Item from "./InventoryWeaponsItem.vue";

const store = useStore();

</script>

<script lang="ts">

export default {
    components: { InventoryHeaderBar, Item },

    data(){return {
        shadow: { ...Defaults.Arrays.inventory.weapons } as WeaponSchema
    }},

    computed: {
        ...mapStores(useStore),


        getWeaponAmount(){
            return this.baseStore.inventory.weapons.length;
        },

        getUnLockedWeaponAmount(){
            return this.baseStore.inventory.weapons.filter(itm=>!itm.locked).length;
        }
    },

    methods: {

        // Event: When the shadow element changes
        onShadowChange(){
            // Ensures that the element is not empty
            if(this.shadow.name.trim().length <= 0)
                return;

            // Creates the new element
            this.baseStore.inventory_registerWeapon(this.shadow);

            // Resets the shadow element
            this.shadow = { ...Defaults.Arrays.inventory.weapons } as WeaponSchema;
        },

        // Event: Whenever any normal element changes
        onNormalChange(item: WeaponSchema){
            // Checks if the element's name is now empty
            if(item.name.trim().length <= 0){
                // Removes the item
                this.baseStore.inventory_removeWeapon(item);
            }
        },

        // Event: When the weapon-type icon get's clicked
        onTypeChangeRequest(item: WeaponSchema){
            // Switches to the next type
            item.type = changeToNext(WeaponType, item.type);
        },

        // Event: When the lock icon get's clicked
        onLockRequest(item: WeaponSchema){
            // Toggles the locked state
            item.locked = !item.locked;
        },

        // Event: When the equip icon get's clicked
        onEquipRequest(item: WeaponSchema){
            if(item.locked) return;

            // Sets the item as the held
            this.baseStore.active.item = item.name;
        },

        // Event: When the delete icon get's clicked
        onDeleteRequest(item: WeaponSchema){

             // Askes the user if the item shall be deleted
            var shouldDelete = confirm(`Möchtest du das Item '${getShortName(item.name, 20)}' wirklich löschen?`);
            
            if(!shouldDelete)
                return;

            // Deletes the item
            this.baseStore.inventory_removeWeapon(item);
        }
    }
}

</script>

<template>
<InventoryHeaderBar icon="weapons" title="Waffen" :current="getUnLockedWeaponAmount" :max="getWeaponAmount" />
<div class="weapons" id="inv-weapons">

    <!-- All other items -->
    <Item
        v-for="itm, idx in store.inventory.weapons" :key="idx"
        
        :item="itm"
        
        @change="onNormalChange(itm)"
        @delete="onDeleteRequest(itm)"
        @equip="onEquipRequest(itm)"
        @lock="onLockRequest(itm)"
        @typeChange="onTypeChangeRequest(itm)"
        />

    <!-- Shadow item -->
    <Item :isShadow="true" :item="shadow"
        @change="onShadowChange"
        @typeChange="onTypeChangeRequest(shadow)" />
</div>
</template>

<style scoped lang="scss">
.weapons{
    &>*{
        margin-bottom: .5rem;

        &:last-child{
            margin-bottom: 0;
        }
    }
}
</style>
