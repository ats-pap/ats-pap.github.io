<script setup lang="ts">
import type { SkillTableCollectionSchema } from '@/schema/SchemaTypes';
import { useStore } from '@/userinterface/Store';
import { mapStores } from 'pinia';
import SheetTable from './skills/TheSkillSheetTable.vue';
import { computed } from 'vue';

const store = useStore();

const pointsLeft = computed(()=>{
    // Holds all points of all tables combined
    var allUsedPoints = 0;

    // Iterates over all three tables
    for (var tableName in store.skills.tables) {
        // Gets the items
        let items = store.skills.tables[tableName as keyof SkillTableCollectionSchema].items;

        // Combines the points and adds them
        allUsedPoints += items.map(itm => itm.points).reduce((a, b) => a + b, 0);
    }

    return store.skills.allowedPoints - allUsedPoints;
});

</script>

<template>
    <h1>Skills</h1>
    <SheetTable />

    <p class="sheet-footer">
        Von
        <input type="number" min="0" max="999" placeholder="0" v-model.number="store.skills.allowedPoints">
        zu vergebenden Punkten sind noch
        <span :class="'autocalc ' + (pointsLeft < 0 ? 'negative' : '')">{{ pointsLeft }}</span>
        übrig.
    </p>
</template>

<style scoped lang="scss"></style>
