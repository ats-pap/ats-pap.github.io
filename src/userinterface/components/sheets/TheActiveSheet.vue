<script setup lang="ts">
import { useStore } from '@/userinterface/Store';
import LeftRightSplit from '../utils/LeftRightSplit.vue';
import Onefield from '../utils/Onefield.vue';
import TheSheetActiveEffectList from './active/TheSheetActiveEffectList.vue';
import TheSheetActiveMinis from './active/TheSheetActiveMinis.vue';

const store = useStore();

</script>

<script lang="ts">

export default {
    components: { Onefield, SheetActiveEffectList: TheSheetActiveEffectList }
}

</script>

<template>
<h1>Aktivkarte</h1>
<LeftRightSplit>
    <TheSheetActiveMinis />
    <div class="right">
        <h3>Notizen</h3>
        <textarea v-model="store.active.notes"></textarea>
    </div>
</LeftRightSplit>
<TheSheetActiveEffectList/>

</template>

<style scoped lang="scss">

@import "@/assets/styles/Settings.scss";

.lr-split{
    margin: 10px;
}

.right{
    width: 100%;
    display: flex;
    flex-direction: column;


    textarea{
        flex-grow: 1;
        resize: none;
        outline: none;
        padding: .8rem;
        border: $fieldBorder;
        border-radius: $fieldBorderRadius;
        margin-bottom: 10px;
    }
}

</style>
