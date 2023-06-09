<script setup lang="ts">
import { useStore } from '@/userinterface/Store';
import TheOverlayLicenses from './overlays/TheOverlayLicenses.vue';
import { OverlayType } from "@/schema/SchemaTypes";
import Icon from '../utils/Icon.vue';
import TheOverlayScaleSheet from './overlays/TheOverlayScaleSheet.vue';

const store = useStore();

</script>

<script lang="ts">

export default {
    components: { TheOverlayLicenses, Icon, TheOverlayScaleSheet },
    methods: {
        onBackgroundClicked(evt: any){
            // Ensures the overlay is only closed if click outside a window
            if(!evt.target.classList.contains("overlay-base"))
                return;
            // Closes the overlay
            useStore().overlay_close()
        }
    }
}

</script>

<template>  
<div v-if="store.app.overlay.current !== undefined" @click="onBackgroundClicked" class="overlay-base">
    <TheOverlayLicenses v-if="store.app.overlay.current === OverlayType.LICENSES" />
    <TheOverlayScaleSheet v-if="store.app.overlay.current === OverlayType.SHEET_SCALE" />
</div>
</template>

<style scoped lang="scss">

.overlay-base{
    position: fixed;
    cursor: pointer;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.482);
    z-index: 999;
    justify-content: center;
    align-items: center;
    display: flex;    
}
</style>
