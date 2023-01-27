<script setup lang="ts">
import PageCharacterTableInput from './CharacterSheetTableInput.vue';

</script>

<script lang="ts">

export default {
    components: { Field: PageCharacterTableInput }
}

</script>

<template>  
<table>
    <tbody>
        <tr>
            <td colspan="2">
                <Field keyName="name" placeholder="Franz..." title="Name" />
            </td>
        </tr>
        <tr>
            <td>
                <Field keyName="gender" placeholder="Apache..." title="Geschlecht" />
            </td>
            <td>
                <Field keyName="age" placeholder="18+..." title="Alter" />
            </td>
        </tr>
        <tr>
            <td>
                <Field keyName="body" placeholder="So nen Körper Bruder..." title="Körperbau" />
            </td>
            <td>
                <Field keyName="religion" placeholder="Pastafari..." title="Religion" />
            </td>
        </tr>
        <tr>
            <td>
                <Field keyName="job" placeholder="Fachfrau für Selbstvermarktung..." title="Beruf" />
            </td>
            <td>
                <Field keyName="family" placeholder="Nein..." title="Familienstand" />
            </td>
        </tr>
    </tbody>
</table>
</template>

<style scoped lang="scss">
</style>
