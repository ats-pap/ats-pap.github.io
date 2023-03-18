

<script setup lang="ts">

/*
 * This info field is for a header-bar (eg. inventory) to put some information below a text-field
 */

</script>

<script lang="ts">

export default {
    props: {
        text: {
            type: String,
            required: true
        }
    }
}

</script>

<template>
    <div class="split-view">
        <slot />
        <span>{{ text }}</span>
    </div>
</template>

<style scoped lang="scss">
    .split-view{
        display: inline-flex;
        flex-direction: column;
        align-items: center;

        span{
            font-size: 1rem;
        }

        :deep(*){
            margin-top: 0;
            margin-bottom: 0;
        }
    }
</style>
