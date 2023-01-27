<script setup lang="ts">
import { useStore } from '@/userinterface/Store';
import TheOverlayLicenses from './overlays/TheOverlayLicenses.vue';
import { OverlayType } from "@/schema/SchemaTypes";
import Icon from '../utils/Icon.vue';

const store = useStore();

</script>

<script lang="ts">

export default {
    components: { TheOverlayLicenses, Icon }
}

</script>

<template>  
<div v-if="store.app.overlay.current !== undefined" class="overlay-base">
    <div class="overlay">
        <div class="header">
            <Icon @click="store.overlay_close()" name="delete" />
        </div>

        <TheOverlayLicenses v-if="store.app.overlay.current === OverlayType.LICENSES" />
        
    </div>
</div>
</template>

<style scoped lang="scss">

.overlay-base{
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.482);
    z-index: 999;
    justify-content: center;
    align-items: center;
    display: flex;

    .overlay{
        padding: 1rem;
        position: relative;
        border-radius: 5px;
        border: .16rem solid black;
        background: #d4d4d4;
        max-height: 90%;
        overflow: auto;

        :deep(h2){
            margin-bottom: 2rem;
            font-size: 2.5rem;
        }

        :deep(p){
            display: flex;
            font-size: 1.8rem;
            margin: 0 1rem;
            margin-top: .5rem;
            &>*{
                margin: 0 5px;
            }
        }

        :deep(i){
            width: 2rem;
            height: 2rem;
        }

        .header{
            position: absolute;
            top: 1rem;
            right: 1rem;
            width: 3rem;
            height: 3rem;
            cursor: pointer;
            i{
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
