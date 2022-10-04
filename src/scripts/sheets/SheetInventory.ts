import { initFormItems } from "./invetory/FormItems";
import { initFormWeapons } from "./invetory/FormWeapons";
import { recalcItems, recalcWeapons } from "./invetory/InventoryCalculator";
import { deserializeInventory, serializeInventory } from "./invetory/InventorySerializer";


// Initalizs the inventory sheet
function init(){

    // Inits the items-form
    initFormItems();

    // Inits the weapons-form
    initFormWeapons();

    // Performs the inital calculations
    recalcWeapons();
    recalcItems();
}

export const SheetInventory = {
    init,

    calculateWeapons: recalcWeapons,
    calculateIteams: recalcItems,

    serialize: serializeInventory,
    deserialize: deserializeInventory
}