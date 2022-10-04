
import Ajv from "ajv"
import { Schema, SCHEMA } from "./Schemas";
import { SheetActive } from "../sheets/SheetActive";
import { SheetCharacter } from "../sheets/SheetCharacter";
import { SheetInventory } from "../sheets/SheetInventory";
import { SheetSkills } from "../sheets/SheetSkills";
import { SkillTableKey } from "../UiBindings";


// JSON-Schema-validator
const validateSchema = new Ajv().compile(SCHEMA);

// Returns if the given element is a valid scham-object
function isValidSaveObject(raw: any) : raw is Schema{
    return validateSchema(raw) as boolean;
}

/**
 * Takes in a @param raw element and tries to deserialize and load it into the page
 * @returns if the deserializsation was successful
 */
function deserialize(raw: any) : Ajv.ErrorObject[]|true {
    // Checks for an invalid schema
    if(!isValidSaveObject(raw))
        return validateSchema.errors!;

    // Updates the sheets
    SheetCharacter.deserialize(raw.character);
    SheetActive.deserialize(raw.active);
    SheetSkills.deserialize(raw.skills);
    SheetInventory.deserialize(raw.inventory);

    // Recalculates the whole form
    SheetSkills.calculatePointsLeft();
    for(var tbl in raw.skills.tables)
        SheetSkills.calculateTabel(tbl as SkillTableKey);
    SheetInventory.calculateIteams();
    SheetInventory.calculateWeapons();
    SheetActive.calculateHealth();
    
    return true;
}

// Serializes all sheets
async function serialize(){
    return {
        character: await SheetCharacter.serialize(),
        active: SheetActive.serialize(),
        skills: SheetSkills.serialize(),
        inventory: SheetInventory.serialize()
    }
}

export const Serializer = {
    serialize,
    deserialize
}