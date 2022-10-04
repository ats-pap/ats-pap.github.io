import { getUiBindings, InventoryList } from "../../UiBindings";
import { ScheduledExecutor } from "../../utils/DelayedExecutor";
import { SHADOW_FILTER } from "../../utils/Utils";

// Recalcs the given table
function recalcTable(list: InventoryList){

    // Gets all rows
    var rows = Array.from(list.table.children).filter(SHADOW_FILTER as any);

    // Calcs how many are locked
    var amtLocked = rows.filter(row=>row.classList.contains("locked")).map(row=>1).reduce((a,b)=>a+b,0);

    // Calcs how many are given in general
    var amt = rows.map(_=>1).reduce((a,b)=>a+b,0);

    // Updates the display
    list.amountDisplay.textContent = amt.toString();
    list.unlockedDisplay.textContent = (amt-amtLocked).toString();
}

// Calculates the health
const WEAPONS_CALCULATOR = new ScheduledExecutor();
export const recalcWeapons =() => WEAPONS_CALCULATOR.run(
    ()=> recalcTable(getUiBindings().inventory.weaponsList)
);

// Calculates the health
const ITEMS_CALCULATOR = new ScheduledExecutor();
export const recalcItems =() => ITEMS_CALCULATOR.run(
    ()=> recalcTable(getUiBindings().inventory.itemList)
);