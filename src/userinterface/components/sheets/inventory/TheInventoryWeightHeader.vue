<script setup lang="ts">
import { useStore } from '@/userinterface/Store';
import { mapStores } from 'pinia';
import HeaderinfoField from '../../utils/HeaderInfoField.vue';



const store = useStore();
</script>

<script lang="ts">


export default {
    computed: {
        ...mapStores(useStore),
        getWeightLeft(): number {
            // Gets the weight of all weapons and items
            var wpnWeight = this.baseStore.inventory.weapons.map(itm => itm.weight).reduce((a, b) => a + b, 0);
            var itmWeight = this.baseStore.inventory.items.map(itm => itm.weight).reduce((a, b) => a + b, 0);
            return this.baseStore.inventory.allowedWeight - this.baseStore.inventory.weightMalus - wpnWeight - itmWeight;
        }
    },
    components: { HeaderinfoField }
}

</script>

<template>

<p class="sheet-footer">
    Mit (
    <HeaderinfoField text="Grundwert">
        <input type="number" min="0" max="99999" placeholder="0" v-model.number="store.inventory.allowedWeight">
    </HeaderinfoField>
    -

    <HeaderinfoField text="Malus">
        <input :class="store.inventory.weightMalus < 0 ? 'negative' :''" type="number" min="-999" max="999" placeholder="0" v-model.number="store.inventory.weightMalus">
    </HeaderinfoField>
    ) g Tragekapazität, kannst du noch
    <span :class="'autocalc '+(getWeightLeft < 0 ? 'negative' : '')">{{ getWeightLeft }}</span>
    g tragen.
</p>

</template>

<style scoped lang="scss">
</style>
