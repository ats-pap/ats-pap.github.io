<script setup lang="ts">
import FieldsTable from './character/TheCharacterSheetTable.vue';
import Portrait from './character/TheCharacterSheetPortrait.vue';
import LeftRightSplit from '../utils/LeftRightSplit.vue';

</script>

<script lang="ts">

export default {
    components: { ThePageCharacterTable: FieldsTable, ThePageCharacterPortrait: Portrait, LeftRightSplit }
}

</script>

<template>
<h1>Charakterbogen</h1>
<FieldsTable />
</template>

<style scoped lang="scss">
h1{
    margin-bottom: .8rem;
}
</style>
