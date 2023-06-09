<script setup lang="ts">
import { useStore } from '@/userinterface/Store';
import Icon from '../../utils/Icon.vue';

const store = useStore();
</script>

<script lang="ts">

export default {
    components: { Icon }
}

</script>

<template>
    <div class="overlay">
        <div class="header">
            <Icon @click="store.overlay_close()"
                name="delete" />
        </div>


        <h2>Quellen</h2>
        <p>
            <Icon name="locked" /> und
            <Icon name="unlocked" />(Editierte Version des vorherigen) von <a target="_blank"
                href="https://icons8.com/icon/82747/lock">Icons8</a>.
        </p>
        <p>
            <Icon name="armor" />von <a target="_blank"
                href="https://www.flaticon.com/free-icons/armor">Nikita Golubev - Flaticon</a>.
        </p>
        <p>
            <Icon name="blood" />von <a target="_blank"
                href="https://www.flaticon.com/free-icons/blood">Pixel perfect - Flaticon</a>.
        </p>
        <p>
            <Icon name="brain" />von <a target="_blank"
                href="https://www.flaticon.com/free-icons/brain">Freepik - Flaticon</a>.
        </p>
        <p>
            <Icon name="delete" />von uns.
        </p>
        <p>
            <Icon name="equip" />wurde editiert. Das Original ist von <a target="_blank"
                href="https://www.flaticon.com/free-icons/stop">Freepik - Flaticon</a>.
        </p>
        <p>
            <Icon name="heart" />von <a target="_blank"
                href="https://www.flaticon.com/free-icons/heart">Freepik - Flaticon</a>.
        </p>
        <p>
            <Icon name="policestick" />von <a target="_blank"
                href="https://www.flaticon.com/free-icons/baton">Freepik - Flaticon</a>.
        </p>
        <p>
            <Icon name="sword" />von <a target="_blank"
                href="https://www.flaticon.com/free-icons/sword">Freepik - Flaticon</a>.
        </p>
        <p>
            <Icon name="pistole" />von <a target="_blank"
                href="https://www.flaticon.com/free-icons/gun">Freepik - Flaticon</a>.
        </p>
        <p>
            <Icon name="sniper" />von <a target="_blank"
                href="https://www.flaticon.com/free-icons/sniper">photo3idea_studio - Flaticon</a>.
        </p>
        <p>
            <Icon name="weapons" />von <a target="_blank"
                href="https://www.flaticon.com/free-icons/bomb">Freepik - Flaticon</a>.
        </p>
        <p>
            <Icon name="items" />von <a target="_blank"
                href="https://www.flaticon.com/free-icons/coin">Freepik - Flaticon</a>.
        </p>
        <p>
            <Icon name="save" /> von <a target="_blank"
                href="https://www.flaticon.com/free-icons/save-file">Freepik - Flaticon</a>.
        </p>
        <p>
            <Icon name="load" /> von <a target="_blank"
                href="https://www.flaticon.com/free-icons/folder">gariebaldy - Flaticon</a>.
        </p>
        <p>
            <Icon name="license" /> von <a target="_blank"
                href="https://www.flaticon.com/free-icons/revolver">Icongeek26 - Flaticon</a>.
        </p>
        <p>
            <Icon name="shoot" /> von <a target="_blank"
                href="https://www.flaticon.com/de/kostenlose-icons/code">Freepik - Flaticon</a>.
        </p>
        <p>
            <Icon name="bonus" />und
            <Icon name="malus" /> sind editierte Versionen von <a target="_blank"
                href="https://www.flaticon.com/free-icons/up-arrow">Ayub Irawan - Flaticon</a>.
        </p>
        <p>
            <Icon name="property" />ist eine editierte Version von <a target="_blank"
                href="https://www.flaticon.com/free-icons/attribute">Freepik - Flaticon</a>.
        </p>
        <p>
            <Icon name="mutation" />von<a target="_blank"
                href="https://www.flaticon.com/free-icons/gene">Freepik - Flaticon</a>.
        </p>
        <p>
            <Icon name="arrow-up" />von<a target="_blank"
                href="https://www.flaticon.com/free-icons/up-arrow">Roundicons - Flaticon</a>.
        </p>
        <p>
            <Icon name="arrow-up" />von<a target="_blank"
                href="https://www.flaticon.com/free-icons/arrow">Freepik - Flaticon</a>.
        </p>
        <p>
            <Icon name="ats" />ist eine Editation des<a target="_blank"
                href="https://artandtech.space/">ARTandTECH.space</a>-Logos.
        </p>
        <p>
            <Icon name="illness" />wurde editiert. Das Original ist von <a target="_blank"
                href="https://icons8.com/icon/52772/coronavirus">Icons8</a>
        </p>
        <p>
            <Icon name="psy-illness" />wurde editiert. Das Original ist von <a
                href="https://www.flaticon.com/free-icons/psychology"
                title="psychology icons">Freepik - Flaticon</a>
        </p>
        <p>
            <Icon name="magic" />wurde editiert. Das Original ist von <a
                href="https://www.svgrepo.com/svg/321086/magic-swirl">SVGRepo.com</a>
        </p>
        <p>
            <Icon name="scale" />wurde editiert. Das Original ist von <a
                href="https://www.flaticon.com/free-icons/scale">Freepik - Flaticon</a>
        </p>
    </div>
</template>

<style scoped lang="scss">
.overlay {
    cursor: default;
    padding: 1rem;
    position: relative;
    border-radius: 5px;
    border: .16rem solid black;
    background: #d4d4d4;
    max-height: 90%;
    overflow: auto;

    h2 {
        margin-bottom: 2rem;
        font-size: 2.5rem;
    }

    p {
        display: flex;
        font-size: 1.8rem;
        margin: 0 1rem;
        margin-top: .5rem;

        &>* {
            margin: 0 5px;
        }
    }

    i {
        width: 2rem;
        height: 2rem;
    }

    .header {
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 3rem;
        height: 3rem;
        cursor: pointer;

        i {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
