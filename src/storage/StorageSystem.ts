import { SCHEMA, CHANGE_DEFAULTS } from "@/schema/JsonSchema";
import type { Schema } from "@/schema/SchemaTypes";
import { useStore } from "@/userinterface/Store";
import { dataURLtoFile, toDataURL } from "@/util/GeneralUtils";
import Ajv from "ajv"


// JSON-Schema-validator
const validateSchema = new Ajv().compile(SCHEMA);

// Returns if the given element is a valid scham-object
function isValidSaveObject(raw: any) : raw is Schema {
    return validateSchema(raw) as boolean;
}

// Saves the current application state into a re-loadable json object
export async function save(){
    return await exportStore();
}

// TODO: make this function less sketchy
function applyDefaults(schema: Schema){

    function nextLeyer(value: any, current: any, left: string[]){
        console.log("Layer: ", left, "/", current);
        if(left.length == 1){

            if(current.constructor.name == "Array"){
                for(var itm in current){
                    current[(itm as any)][left[0]] = value;
                }
                return
            }

            current[left[0]] = value;
            return
        }

        nextLeyer(value, current[left[0]], left.slice(1));

    }
    
    for(var key in CHANGE_DEFAULTS){

        nextLeyer((CHANGE_DEFAULTS as any)[key] as any, schema, (key as string).split("."))

    

    }
}

// Loads a raw json object into the application state
// Returns if that was successfull
export function load(raw: Object) : boolean{
    // Checks for an invalid schema
    if(!isValidSaveObject(raw)){
        // Outputs the error
        console.log("Failed to load file: ", validateSchema.errors);
        return false;
    }

    // Applys changes
    applyDefaults(raw);

    // Loads the store
    importStore(raw);

    return true;
}

// Function to import a given validated schema
// This is kind of dirty as the character portrait is not one to one in here, but the portrait b64-data
function importStore(schema: Schema){
    const store = useStore();

    // Ensures the old image is unloaded
    if(store.character.portraitURL !== undefined)
        URL.revokeObjectURL(store.character.portraitURL);

    // Creates the new url
    schema.character.portraitURL = URL.createObjectURL(dataURLtoFile((schema.character as any).portrait, ""));
    (schema.character as any).portrait = undefined;

    store.character = schema.character;
    store.active = schema.active;
    store.inventory = schema.inventory;
    store.skills = schema.skills;
}

// Function to export the current state of the application as a json-object
async function exportStore() {
    const store = useStore();

    // Gets the base-64 image of the portrait
    var portAsB64 = store.character.portraitURL !== undefined ? (await toDataURL(store.character.portraitURL)) : undefined;

    return {
        character: {
            ...store.character,

            // Ensures the image is included
            portraitURL: undefined,
            portrait: portAsB64
        },

        active: store.active,
        inventory: store.inventory,
        skills: store.skills,
    }
}