<script setup lang="ts">
import TheInventoryItems from './inventory/TheInventoryItems.vue';
import TheInventoryWeapons from './inventory/TheInventoryWeapons.vue';

</script>

<script lang="ts">

export default {
    components: { TheInventoryItems, TheInventoryWeapons }
}

</script>

<template>

<h1>Inventar</h1>

<TheInventoryItems />
<TheInventoryWeapons />

</template>

<style scoped lang="scss">
</style>
