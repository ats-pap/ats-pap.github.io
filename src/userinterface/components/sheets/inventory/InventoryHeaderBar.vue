<script setup lang="ts">
import Icon from '../../utils/Icon.vue';

</script>

<script lang="ts">

export default {
    props: {
        icon: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        current: {
            type: Number,
            required: true
        },
        max: {
            type: Number,
            required: true
        }
    },
    components: { Icon }
}

</script>

<template>
<div class="header-bar">
    <div>
        <Icon :name="icon" />
        <h2>{{ title }}</h2>
    </div>
    <p id="inv-items-display"><span class="autocalc">{{ current }}</span>/<span class="autocalc">{{ max }}</span></p>
</div>
</template>

<style scoped lang="scss">

@import "@/assets/styles/Settings.scss";

.header-bar{
    border: $fieldBorder;
    border-radius: $fieldBorderRadius;
    display: inline-block;
    margin-top: 2rem;
    margin-bottom: .8rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    &>div{
        display: flex;
        align-items: center;
    }

    i{
        width: 2.5rem;
        height: 2.5rem;
        margin: .2rem .5rem;
    }

    h2{
        font-size: 1.8rem;
        padding: .2rem 0;
    }

    h2,p{
        display: inline-block;
        margin-bottom: -3px;
    }

    p{
        font-size: 1.4rem;
        padding: 0 0.5rem;
        text-align: center;
    }

}

</style>
