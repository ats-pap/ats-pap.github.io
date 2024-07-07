import { SCHEMA, CHANGE_DEFAULTS } from "@/schema/JsonSchema";
import type { Schema } from "@/schema/SchemaTypes";
import { useStore } from "@/userinterface/Store";
import { dataURLtoFile, toDataURL } from "@/util/GeneralUtils";
import Ajv from "ajv"


// JSON-Schema-validator
const validateSchema = new Ajv().compile(SCHEMA);

// Returns if the given element is a valid scham-object
function isValidSaveObject(raw: any) : raw is Schema {
    const isValid = validateSchema(raw) as boolean;

    if(!isValid)
        console.error(validateSchema.errors);
    return isValid;
}

// Saves the current application state into a re-loadable json object
export async function save(){
    return await exportStore();
}

// Applys the default values to a given schema to support downwards compatibility
function applyDefaults(schema: Schema){

    /**
     * Recursive function to apply changes to layers
     * @param value the final value to be set
     * @param key of the next layer to go through 
     * @param layersLeft
     *          how many layers the change must go through.
     *          If there is only one item left, the end has been reached and the
     *          change is applied.
     *          The layers also may contain array if action should be performed on
     *          multiple items.
     */
    function nextLayer(value: any, editable: any, layersLeft: string[]){

        // Gets the current key on the object
        const key = layersLeft[0];

        // Checks if this is the last layer
        if(layersLeft.length == 1){
            // Updates the value if it's still the default
            if(editable[key] === undefined)
                editable[key] = value;
            return;
        }

        // Checks if the current layer is an array
        if(editable[key].constructor.name == "Array"){
            for(var newkey in editable[key])
                nextLayer(value, editable[key][newkey], layersLeft.slice(1))
        }else{
            nextLayer(value, editable[key], layersLeft.slice(1))
        }
    }

    // Applies the changes
    for(var key in CHANGE_DEFAULTS)
        nextLayer((CHANGE_DEFAULTS as any)[key] as any, schema, (key as string).split("."))
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
    if((schema.character as any).portrait !== undefined){
        schema.character.portraitURL = URL.createObjectURL(dataURLtoFile((schema.character as any).portrait, ""));
        (schema.character as any).portrait = undefined;
    }

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