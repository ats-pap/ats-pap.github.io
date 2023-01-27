<script setup lang="ts">
import LeftRightSplit from '../../utils/LeftRightSplit.vue';
import PageCharacterTableInput from './CharacterSheetTableInput.vue';
import Portrait from './TheCharacterSheetPortrait.vue';

</script>

<script lang="ts">

export default {
    components: { Field: PageCharacterTableInput, LeftRightSplit, TheCharacterSheetPortrait: Portrait }
}

</script>

<template>
<div class="grid">
    <Field keyName="name"     placeholder="Franz..." title="Name" />
    <Field keyName="gender"   placeholder="Apache..." title="Geschlecht" />
    <Field keyName="age"      placeholder="18+..." title="Alter" />
    <Field keyName="body"     placeholder="So nen Körper Bruder..." title="Körperbau" />
    <Field keyName="religion" placeholder="Pastafari..." title="Religion" />
    <Field keyName="job"      placeholder="Fachfrau für Selbstvermarktung..." title="Beruf" />
    <Field keyName="family"   placeholder="Nein..." title="Familienstand" />
    <Field keyName="fraction" placeholder="Deutschland GMBH..." title="Fraktion" />
    <Field keyName="origin"   placeholder="Ehemaliger einsammer Krieger..." title="Herkunft" :useTextfield="true" />
    <Portrait />
</div>

</template>

<style scoped lang="scss">
.grid{
    display: grid;
    width: 100%;
    height: 100%;
    column-gap: 1rem;
    row-gap: 1rem;
    grid-template-columns: .8fr 1fr 1fr;
    grid-template-rows:    .8fr 1fr 1fr;
    grid-template-areas:
        "name     name     name"
        "portrait gender   age"
        "portrait body     fraction"
        "portrait job      origin"
        "portrait family   origin"
        "portrait religion origin"
}
</style>
