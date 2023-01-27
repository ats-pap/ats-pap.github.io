
<!-- Simple an input, which is strongly validated -->

<script lang="ts">

export default {

    props: {
        placeholder: String,
        type: String,
        id: String,
        min: String,
        max: String,
        classList: String,
        maxlength: String,

        value: [String, Number]
    },

    methods: {
        // Event: When an input is done
        onInput(evt: Event){
            var inp = evt.target as HTMLInputElement;

            // Ensures the element is validated
            if(!inp.validity.valid){

                // Resets the input field
                inp.value = this.value as any;
                return;
            }

            // Gets the value
            var value = inp.value;

            // Checks if the element is invalid and numeric
            if(inp.type === "number" && isNaN(inp.valueAsNumber))
                value = inp.min;
            

            // Forwards the event
            this.$emit('input', value);
        }
    },

    emits: ["input", "change"]
}

</script>

<template>
<input
    :class="classList" :maxlength="maxlength" :placeholder="placeholder"
    :min="min" :max="max"
    :id="id" :type="type"
    :value="value"
    @input="onInput"
    @change="$emit('change')"
    />
</template>