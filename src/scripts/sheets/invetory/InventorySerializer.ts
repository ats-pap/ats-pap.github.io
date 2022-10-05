import { InventorySchema } from "../../serialisation/Schemas";
import { getUiBindings } from "../../UiBindings";
import { F, getNumberFromInput, SHADOW_FILTER } from "../../utils/Utils";
import { getItemsGrowHandler } from "./FormItems";
import { getWeaponsGrowHandler } from "./FormWeapons";

// Serializes the item-list
function serializeItems(){
    // Serializes a single row
    function serializeRow(row: HTMLDivElement){
        // Gets name and amount
        var name = F<HTMLInputElement>("input",F(".name",row)).value;
        var amount = getNumberFromInput(F("input",F(".amt",row)), 0);

        return {
            name,
            amount,
            locked: row.classList.contains("locked")
        }
    }
    
    // Gets all rows (Items) and maps them to their required form
    return Array.from(getUiBindings().inventory.itemList.table.children)
                .filter(SHADOW_FILTER as any)
                .map(serializeRow as any);
}

// Serializes the weapons-list
function serializeWeapons(){
    // Serializes a single row
    function serializeRow(row: HTMLDivElement){
        // Gets name, type, category and damage
        var name = F<HTMLInputElement>("input",F(".name",row)).value;
        var category = F<HTMLInputElement>("input",F(".category",row)).value;
        var damage = F<HTMLInputElement>("input",F(".damage",row)).value;
        var type = F("i", F(".icon", row)).dataset.type ?? "one_hand";

        return {
            name,
            category,
            damage,
            type,
            locked: row.classList.contains("locked")
        }
    }
    
    // Gets all rows (Items) and maps them to their required form
    return Array.from(getUiBindings().inventory.weaponsList.table.children)
                .filter(SHADOW_FILTER as any)
                .map(serializeRow as any);
}

// Deserializes the inventory
export function deserializeInventory(raw: InventorySchema){
    // Weapons
    var weaponsHandler = getWeaponsGrowHandler();

    weaponsHandler.clear();
    for(var wp of raw.weapons)
        weaponsHandler.addElement(wp);
    
    // Items
    var itemHandler = getItemsGrowHandler();

    itemHandler.clear();
    for(var itm of raw.items)
        itemHandler.addElement(itm);
}

// Serializes the active-sheet
export function serializeInventory(){
    return {
        items: serializeItems(),
        weapons: serializeWeapons()
    }
}