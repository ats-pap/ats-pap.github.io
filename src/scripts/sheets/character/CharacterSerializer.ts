import { CharacterSchema } from "../../serialisation/Schemas";
import { getUiBindings } from "../../UiBindings";
import { dataURLtoFile, toDataURL } from "../../utils/Utils";
import { SheetCharacter } from "../SheetCharacter";

// Deserializes the character
export function deserializeCharacter(raw: CharacterSchema){

    // Gets the ui-bindings
    var char = getUiBindings().character;

    // Updates the usual values
    char.age.value = raw.age;
    char.body.value = raw.body;
    char.family.value = raw.family;
    char.gender.value = raw.gender;
    char.job.value = raw.job;
    char.name.value = raw.name;
    char.religion.value = raw.religion;

    // Updates the portrait
    if(raw.portrait !== undefined)
        SheetCharacter.setPortrait(dataURLtoFile(raw.portrait, ""));
}

// Serializes the character
export async function serializeCharacter(){

    // Gets the ui-bindings
    var char = getUiBindings().character;

    // Serializes the image (If one got uploaded)
    var portraitLink = char.portrait.display.dataset.image
    var portrait = portraitLink !== undefined ? (await toDataURL(portraitLink)) : undefined;

    return {
        name: char.name.value,
        gender: char.gender.value,
        age: char.age.value,
        body: char.body.value,
        religion: char.religion.value,
        job: char.job.value,
        family: char.family.value,
        portrait: portrait
    }
}