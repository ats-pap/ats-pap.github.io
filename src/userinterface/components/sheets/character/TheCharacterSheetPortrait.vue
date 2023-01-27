<script setup lang="ts">
import { useStore } from '@/userinterface/Store';
import { getRef } from '@/util/VueUtils';
import { mapStores } from 'pinia';
import type { StyleValue } from 'vue';


</script>

<script lang="ts">

export default {

    methods: {
        // Updates the portrait
        // Returns false if the file is in an valid format
        setPortrait(file: File){
            // Validates file-type
            if(!["image/png","image/jpeg","image/gif"].includes(file.type)){
                // Notifies the user
                return false;
            }

            // Revokes any previous image (If uploaded)

            // Unloads any previous image (if one was loaded)
            if(this.baseStore.character.portraitURL !== undefined)
                URL.revokeObjectURL(this.baseStore.character.portraitURL);

            // Creates the new url
            this.baseStore.character.portraitURL = URL.createObjectURL(file);

            return true;
        },

        // Event: When the user uploads an preview-image
        onUploadProfileImage(evt: any){
            // Gets the first uploaded file
            var file = evt.target.files[0];
            
            // Reset the upload-functionality
            evt.target.value = "";

            // Ensures a file got uploaded
            if (!file)
                return false;

            // Sets the file as the preview
            if(!this.setPortrait(file))
                alert("Es können nur Bilder hochgeladen werden");

            return false;
        },

        // Event: When the preview is clicked
        onPreviewClicked(){
            // Forwards the click to the actual file chooser
            getRef<HTMLInputElement>(this,'UploadInput').click();
        }
    },

    computed: {
        ...mapStores(useStore),
        getBackgroundImage() : StyleValue{

            // Checks if this image is unset
            if(this.baseStore.character.portraitURL === undefined)
                return {}

            return {
                backgroundImage: 'url('+this.baseStore.character.portraitURL+')'
            }
        }
    }

}

</script>

<template>
<div class="portrait">
    <span>Portrait</span>
    <div
        @click="onPreviewClicked"
        :style="getBackgroundImage"
        ></div>
    <input ref="UploadInput" type="file" @change="onUploadProfileImage">
</div>
</template>

<style scoped lang="scss">

@import "@/assets/styles/Settings.scss";

.portrait{
    border: $fieldBorder;
    border-radius: $fieldBorderRadius;
    margin: 10px;

    text-align: center;
    width: 15rem;
    height: 100%;
    display: inline-block;
    overflow: hidden;
    height: initial;
    display: flex;
    flex-direction: column;

    input{
        display: none;
    }

    span{
        font-size: 1.8rem;
        font-family: "ChomskyRegular";
        border-bottom: 2px solid #959595;
        padding: .3rem 0;
    }

    div{
        flex-grow: 1;
        flex-shrink: 1;
        background: url("@/assets/Avatar.png");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        margin: 0;
        cursor: pointer;
    }
}

</style>
