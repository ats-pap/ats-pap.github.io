<script setup lang="ts">
import type { SkillTableCollectionSchema } from '@/schema/SchemaTypes';
import { useStore } from '@/userinterface/Store';
import { mapStores } from 'pinia';
import type { PropType } from 'vue';
import Icon from '../../utils/Icon.vue';
import ValidatedInput from "../../utils/ValidatedInput.vue"

const store = useStore();

</script>

<script lang="ts">

export default {
    props: {
        // Name of the property when saving / loading
        keyName: {
            required: true,
            type: String as PropType<keyof SkillTableCollectionSchema>,
        },

        // Title
        title: {
            required: true,
            type: String,
        }
    },

    computed: {
        ...mapStores(useStore),
        
        getCategoryPoints(){
            // Calculates the category points
            return this.baseStore.skills_get_category_points(this.keyName);
        },

        getAllMindflashes(){

            // Calculates the category-mind-flashes
            const flashes = Math.round(this.getCategoryPoints/10);

            // Checks if the users mindflashes are greater than the allowed flashes
            // 
            // This may be a bit of a dirty way to check inside a computed-property,
            // but its sadly the only really good way of doing this
            if(this.baseStore.skills.tables[this.keyName].mindflashes > flashes)
                this.baseStore.skills.tables[this.keyName].mindflashes = flashes;

            return flashes.toString();
        }
    }
}

</script>

<template>
<table>
    <tr>
        <td>{{ title }}</td>
        <td class="i-field">
            <Icon name="brain" />
        </td>
    </tr>
    <tr class="values">
        <td>
            <span class="autocalc"> {{ getCategoryPoints }} </span>
        </td>
        <td class="i-value">
            <ValidatedInput
                placeholder="0"
                :value="store.skills.tables[keyName].mindflashes"
                @input="store.skills.tables[keyName].mindflashes = $event"
                type="number"
                min="0" :max="getAllMindflashes"
                />
            <span>/</span>
            <span class="autocalc">{{ getAllMindflashes }}</span>
        </td>
    </tr>
</table>
</template>

<style scoped lang="scss">

@import "@/assets/styles/Settings.scss";

table{
    font-size: 1.8rem;
    width: 100%;
    border: $fieldBorder;
    border-radius: $fieldBorderRadius;

    td, tr{
        padding: 0;
    }
    
    .points{
        flex-grow: 1;
    }

    .values td{
        padding-bottom: .3rem;
    }

    .i-field{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: .2rem;
    }

    .i-value{
        input{
            width: 2.5rem;
            border: none;
            font-size: 1.8rem;
            font-weight: bold;
            outline: none;
        }

        span{
            margin: 0 .4rem;
            margin-right: 0;
        }
    }

    i{
        width: 3rem;
        height: 3rem;
    }
}
</style>
