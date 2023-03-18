<script setup lang="ts">
import type { SkillTableCollectionSchema } from '@/schema/SchemaTypes';
import { useStore } from '@/userinterface/Store';
import { mapStores } from 'pinia';
import SheetTable from './skills/TheSkillSheetTable.vue';

const store = useStore();

</script>

<script lang="ts">

export default {

    computed: {
        ...mapStores(useStore),
        getPointsLeft(){    
            // Holds all points of all tables combined
            var allUsedPoints = 0;

            // Iterates over all three tables
            for(var tableName in this.baseStore.skills.tables){
                // Gets the items
                let items = this.baseStore.skills.tables[tableName as keyof SkillTableCollectionSchema].items;

                // Combines the points and adds them
                allUsedPoints += items.map(itm=>itm.points).reduce((a,b) => a+b, 0);
            }

            return this.baseStore.skills.allowedPoints - allUsedPoints;
        }
    }
}

</script>

<template>
<h1>Skills</h1>
<SheetTable />

<p class="sheet-footer">
    Von
    <input type="number" min="0" max="999" placeholder="0" v-model.number="store.skills.allowedPoints">
    zu vergebenden Punkten sind noch
    <span :class="'autocalc '+(getPointsLeft < 0 ? 'negative' : '')">{{ getPointsLeft }}</span>
    übrig.
</p>
</template>

<style scoped lang="scss">

</style>
