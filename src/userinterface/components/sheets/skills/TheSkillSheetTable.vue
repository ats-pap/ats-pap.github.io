<script setup lang="ts">
import TableHead from './SkillSheetTableHeader.vue';
import TableBody from './SkillSheetTableBody.vue';
</script>

<script lang="ts">

export default {
}

</script>

<template>
<table>
    <thead>
        <tr>
            <th>
                <TableHead title="Handeln" keyName="act" />
            </th>
            <th>
                <TableHead title="Wissen" keyName="science" />
            </th>
            <th>
                <TableHead title="Soziales" keyName="social" />
            </th>
            <th>
                <TableHead title="Magie" keyName="magic" />
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <TableBody defaultPlaceholder="Scheiße labern" tableName="act"/>
            </td>
            <td>
                <TableBody defaultPlaceholder="Thermodramatik" tableName="science"/>
            </td>
            <td>
                <TableBody defaultPlaceholder="Uffeln" tableName="social"/>
            </td>
            <td>
                <TableBody defaultPlaceholder="Meteoriten werfen" tableName="magic"/>
            </td>
        </tr>
    </tbody>
</table>
</template>

<style scoped lang="scss">
table{
    width: 100%;

    td{
        vertical-align: top;
    }
}
</style>
