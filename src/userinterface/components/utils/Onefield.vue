<script setup lang="ts">
</script>

<script lang="ts">

export default {
    props: {
        isTable: {
            type: Boolean,
            default: false
        },

        classList: {
            type: String,
            default: ""
        }
    }
}

</script>

<template>

<tr style="display: table-row" v-if="isTable" :class="'onefield '+classList">
    <slot />
</tr>
<div v-else :class="'onefield '+classList">
    <slot />
</div>
</template>

<style scoped lang="scss">

@import "@/assets/styles/Settings.scss";

.onefield{
    display: flex;
    align-items: center;
    border: $fieldBorder;
    border-radius: 5px;
}
</style>
