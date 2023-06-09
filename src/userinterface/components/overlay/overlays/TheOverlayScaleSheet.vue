<script setup lang="ts">
import { useStore } from '@/userinterface/Store';
import Icon from '../../utils/Icon.vue';

const store = useStore();
</script>

<script lang="ts">

export default {
    components: { Icon },
    methods: {
        // Returns the max size (In REM)
        maxSize(){
            return document.body.clientWidth/16;
        }
    }
}

</script>

<template>
    <div class="overlay">
        <h2>Papier Breite ändern</h2>
        <input
            type="range"
            v-model="store.app.width"
            min="70"
            :max="maxSize()"
            />
    </div>
</template>

<style scoped lang="scss">
.overlay {
    cursor: default;
    padding: 1rem;
    position: relative;
    border-radius: 5px;
    border: .16rem solid black;
    background: #d4d4d4;
    max-height: 90%;
    overflow: auto;
    align-self: flex-end;
    margin-bottom: 2rem;

    input[type="range"]{
        width: 100%;
    }
}
</style>
