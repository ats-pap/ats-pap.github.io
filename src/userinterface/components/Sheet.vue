<script setup lang="ts">

</script>

<script lang="ts">

export default {
}

</script>

<template>  
<div class="sheet">
    <slot />
</div>
</template>

<style lang="scss">
@import "../../assets/styles/Settings.scss";



.sheet {

    background: white;
    width: 70rem;
    margin: auto;
    padding: 1rem;
    border-radius: .3rem;
    margin-bottom: 4rem;
    min-width: 85rem;

    &:last-child{
        margin-bottom: 0;
    }

    .field {
        border: $fieldBorder;
        border-radius: $fieldBorderRadius;
    }

    .field{
        display: flex;
        flex-direction: column;

        label{
            padding: .2rem;
            padding-left: 1rem;
            font-size: 1.2rem;
        }

        input{
            border: none;
            font-size: 1.4rem;
            padding: .2rem .4rem;
            outline: none;
        }
    }

    table{
        flex-grow: 1;
        border-spacing: 0px;
    }

    td, th{
        padding: 10px;
    }

    h1{
        padding-bottom: 0;
        font-family: "NewTelegraph";
    }

}
</style>
