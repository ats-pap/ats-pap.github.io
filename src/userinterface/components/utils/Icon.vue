<script setup lang="ts">

</script>

<script lang="ts">

export default {
    props: {
        name: {
            required: true,
            type: String
        }
    },

    emits: ["click"]
}

</script>

<template>
<i @click="$emit('click')" :class="'ic-'+name"></i>
</template>

<style scoped lang="scss">
.ic-unlocked{ background: url("@/assets/icons/Activate.png"); }
.ic-armor{ background: url("@/assets/icons/Armor.png"); }
.ic-ats{ background: url("@/assets/icons/ATS.png"); }
.ic-blood{ background: url("@/assets/icons/Blood.png"); }
.ic-brain{ background: url("@/assets/icons/Brain.png"); }
.ic-bonus{ background: url("@/assets/icons/Bonus.png"); }
.ic-locked{ background: url("@/assets/icons/Deactivate.png"); }
.ic-delete{ background: url("@/assets/icons/Delete.png"); }
.ic-equip{ background: url("@/assets/icons/Hand.png"); }
.ic-heart{ background: url("@/assets/icons/Heart.png"); }
.ic-items{ background: url("@/assets/icons/Items.png"); }
.ic-license{ background: url("@/assets/icons/License.png"); }
.ic-load{ background: url("@/assets/icons/Load.png"); }
.ic-malus{ background: url("@/assets/icons/Malus.png"); }
.ic-policestick{ background: url("@/assets/icons/MeleeDull.png"); }
.ic-sword{ background: url("@/assets/icons/MeleeSharp.png"); }
.ic-pistole{ background: url("@/assets/icons/OnehandedWeapon.png"); }
.ic-save{ background: url("@/assets/icons/Save.png"); }
.ic-shoot{ background: url("@/assets/icons/Shoot.png"); }
.ic-sniper{ background: url("@/assets/icons/TwohandedWeapon.png"); }
.ic-weapons{ background: url("@/assets/icons/Weapons.png"); }
.ic-property{ background: url("@/assets/icons/Property.png"); }
.ic-mutation{ background: url("@/assets/icons/GeneMutation.png"); }
.ic-arrow-up{ background: url("@/assets/icons/ArrowDown.png"); }
.ic-arrow-down{ background: url("@/assets/icons/ArrowUp.png"); }
.ic-illness{ background: url("@/assets/icons/Illness.png"); }
.ic-psy-illness{ background: url("@/assets/icons/PsyIllness.png"); }
.ic-magic{ background: url("@/assets/icons/Magic.png"); }
.ic-scale{ background: url("@/assets/icons/Scale.png"); }
</style>
