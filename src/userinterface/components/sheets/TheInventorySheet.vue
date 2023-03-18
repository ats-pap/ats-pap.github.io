<script setup lang="ts">
import TheInventoryItems from './inventory/TheInventoryItems.vue';
import TheInventoryWeapons from './inventory/TheInventoryWeapons.vue';
import TheInventoryWeightHeader from './inventory/TheInventoryWeightHeader.vue';

</script>

<script lang="ts">

export default {
    components: { TheInventoryItems, TheInventoryWeapons, TheInventoryWeightHeader }
}

</script>

<template>

<h1>Inventar</h1>

<TheInventoryWeightHeader />

<TheInventoryItems />
<TheInventoryWeapons />

</template>

<style scoped lang="scss">



</style>
