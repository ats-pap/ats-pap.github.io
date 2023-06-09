<script setup lang="ts">
import { OverlayType } from '@/schema/SchemaTypes';
import { load, save } from '@/storage/StorageSystem';
import { useStore } from '@/userinterface/Store';
import { getRef } from '@/util/VueUtils';
import Icon from '../utils/Icon.vue';

const store = useStore();

</script>

<script lang="ts">

export default {
    components: { Icon },

    methods: {

        // Event: (2) When the uploaded file is finally read
        onReadFile(evt: any){
            try{
                // Gets the content
                var cont = evt.target.result;

                // Tries to import it
                var error = load(JSON.parse(cont))
                    
                if(error === false){
                    alert("Datei ist invalid/corrupted.");
                    console.log(error);
                }
            }catch(e){
                console.log(e);
                alert("Fehler beim einlesen der Datei. Vmtl. invalides JSON.");
            }
        },

        // Event: (1) When a new file gets uploaded
        onUploadFile(evt: any){
            var file = evt.target.files[0];
            if (!file)
                return false;

            var reader = new FileReader();
            reader.onload = this.onReadFile;
            reader.readAsText(file);

            // Reset
            evt.target.value = "";
            return false;

        },

        // Event: When the save icon is clocked
        async onClickSave(){
            // Exports
            var data = await save();

            // Creates the file
            var file = new Blob([JSON.stringify(data)],{
                endings: "native",
                type: "text/json"
            });

            // Generates the filename
            var filename = (data.character.name.trim().length <= 0 ? "" : data.character.name+"'s") + " Charakterbogen.json"

            // Creates an element to download the element
            var a = document.createElement("a");
            var url = a.href = URL.createObjectURL(file);
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(()=>{
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        },

        // Event: When the load icon is clicked
        onClickLoad(){
            getRef<HTMLInputElement>(this, "UploadHelper").click();
        }
    }
}

</script>

<template>  
<div class="toolbox">
    <input ref="UploadHelper" @change="onUploadFile" type="file" class="uploadHelper">
    <div class="upload" @click="onClickLoad">
        <Icon name="load" />
        <span>öffnen</span>
    </div>
    <div class="download" @click="onClickSave">
        <Icon name="save" />
        <span>Speichern</span>
    </div>
    <div class="sources" @click="store.overlay_open(OverlayType.LICENSES)">
        <Icon name="license" />
        <span>Lizenzen</span>
    </div>
    <div class="sources" @click="store.overlay_open(OverlayType.SHEET_SCALE)">
        <Icon name="scale" />
        <span>Sheet-Scale</span>
    </div>
    <a href="https://artandtech.space/" target="_blank" class="ats">
        <Icon name="ats" />
        <span>Über uns</span>
    </a>
</div>
</template>

<style scoped lang="scss">

.toolbox{
    background: #494949;
    position: fixed;
    display: flex;
    flex-direction: column;
    z-index: 99;
    padding: 2rem 0.4rem;
    border-top-right-radius: 2rem;
    border-bottom-right-radius: 2rem;
    color: white;
    top: 50%;
    transform: translateY(-50%);

    left: -4rem;
    transition: .5s;
    &:hover{
        left:0;
        transition: .5s;
    }

    .uploadHelper{
        display: none;
    }

    a, a:active, a:visited, a:hover{
        color: white;
        text-decoration: none;
    }

    div, a{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-bottom:1.5rem;
    }

    span{
        font-size: 1.3rem;
    }
    *:last-child{
        margin-bottom: 0;
    }

    i{
        width: 4rem;
        height: 4rem;
    }
}
</style>
