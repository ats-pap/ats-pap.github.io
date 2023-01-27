<script setup lang="ts">
import TheOverlay from './components/overlay/TheOverlay.vue';
import Sheet from './components/Sheet.vue';
import TheActiveSheet from './components/sheets/TheActiveSheet.vue';
import TheCharacterSheet from './components/sheets/TheCharacterSheet.vue';
import TheInventorySheet from './components/sheets/TheInventorySheet.vue';
import TheSkillsSheet from './components/sheets/TheSkillsSheet.vue';
import TheToolbox from './components/toolbox/TheToolbox.vue';

</script>

<script lang="ts">

export default {
    components: { TheCharacterSheet, Sheet, TheSkillsSheet, TheActiveSheet, TheInventorySheet, TheToolbox, TheOverlay }
}

</script>

<template>

<TheOverlay />

<TheToolbox />

<Sheet>
  <TheCharacterSheet />
</Sheet>

<Sheet>
  <TheSkillsSheet />
</Sheet>

<Sheet>
  <TheActiveSheet />
</Sheet>

<Sheet>
  <TheInventorySheet />
</Sheet> 
</template>

<style lang="scss" scoped>
</style>
