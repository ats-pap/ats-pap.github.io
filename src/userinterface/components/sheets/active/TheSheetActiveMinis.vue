<script setup lang="ts">
import Onefield from '../../utils/Onefield.vue';
import GrowInput from '../../utils/GrowInput.vue';
import Icon from '../../utils/Icon.vue';
import Seperator from "../../utils/OnefieldSeperator.vue"
import HealthIcon from './SheetActiveHealthIcon.vue';
import { useStore } from '@/userinterface/Store';
import { computed } from 'vue';

const store = useStore();

const healthLeft = computed(() => {
    var { armor, base, damage } = store.active.health;

    return base + armor - damage;
})

// Event: When the delete held item is clicked
function onDeleteHeldClicked(){
    // Unselects the item
    store.active.item = "";
}

// Event: When the shoot icon is clicked
function onShootClicked(){
    // Gets the current value
    var value = store.active.ammunition;

    // Checks if enought ammunition is given
    if (value <= 0) {
        alert("Du hast keine Munition mehr.");
        return;
    }

    // Decreases the ammunition
    store.active.ammunition = value - 1;
}

</script>

<template>
    <div class="minis">

        <div class="selected-item">
            <p>Ausgewähltes Item</p>
            <Onefield>
                <GrowInput placeholder="Leer" v-model="store.active.item" id="act-selected-item" type="text"></GrowInput>
                <Seperator />
                <!--id="act-del-selected-item"-->
                <Icon name="delete" @click="onDeleteHeldClicked" />
            </Onefield>
        </div>

        <div class="ammunition">
            <p>Munition</p>
            <Onefield>
                <GrowInput placeholder="0" v-model.number="store.active.ammunition" min="0" max="99999" id="act-ammunition"
                    type="number"></GrowInput>
                <span>Schuss</span>
                <Seperator />
                <!--id="act-shoot"-->
                <Icon name="shoot" @click="onShootClicked" />
            </Onefield>
        </div>

        <div class="skills">
            <HealthIcon keyName="base" icon="heart" name="Basis" default="100" />

            <span class="char">+</span>

            <HealthIcon keyName="armor" min="0" icon="armor" name="Rüstung" />

            <span class="char">-</span>

            <HealthIcon keyName="damage" min="0" icon="blood" name="Schaden" />

            <span class="char">=</span>
        </div>

        <p :class="'health-left ' + (healthLeft <= 0 ? 'negative' : '')"><span>{{ healthLeft }}</span>Hp</p>

        <h3 class="effect-title">Effekteliste</h3>
    </div>
</template>

<style lang="scss"></style>

<style scoped lang="scss">
@import "@/assets/styles/Settings.scss";

.minis {
    min-width: 55%;
    margin-right: 1rem;
    margin-top: 1rem;

    .effect-title {
        margin-bottom: 0;
    }

    .selected-item :deep(.seperator) {
        margin-left: .4rem;
    }

    .selected-item,
    .ammunition {
        display: flex;
        align-items: center;

        :deep(.grow-input) {
            max-width: 23rem;
            min-width: 3rem;

            * {
                font-size: 1.2rem;
            }

            span {
                padding: .2rem .4rem;
            }
        }

        p {
            font-size: 1.4rem;
            display: inline-block;
            margin-right: .5rem;
        }

        i {
            width: 1.8rem;
            height: 1.8rem;
            margin-left: .2rem;
            cursor: pointer;
        }
    }

    .ammunition {
        margin-top: .5rem;

        &>div>span {
            font-size: 1.4rem;
            padding: 0 .4rem;
        }
    }

    .skills {
        margin: 3rem 2rem 2rem 2rem;
        display: flex;
        justify-content: space-between;

        .char {
            font-size: 3.5rem;
            font-family: "NewTelegraph";
            margin: 0 1rem;
        }
    }

    .health-left {

        &.negative {
            color: $negativeColor;
        }

        &,
        span {
            font-size: 3rem;
            font-family: "ChomskyRegular";
        }

        display: block;
        text-align: center;
        margin-bottom: 2rem;
    }
}
</style>
