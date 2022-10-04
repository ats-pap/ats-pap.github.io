import { SkillTable } from "../../UiBindings";
import { F, FA, getNumberFromInput, SHADOW_FILTER } from "../../utils/Utils";

// Bindings of a row from the skill-tables
export type RowBindings = {
    // Where the final row-points will be displayed
    display: HTMLSpanElement,
    // Points defined by the user
    points: number,
    // Malus/Bonus points defined by the user
    malusBonusPoints: number,
    // Name of the row
    name: string
}

// Returns all table-rows of the given category-bindings
export function getTableRows(binds: SkillTable){
    return Array.from(FA("tr", binds.values)).filter(SHADOW_FILTER) as HTMLTableRowElement[];
}

// Maps a row-element to its important values for further processing
export function getRowImportants(row: HTMLTableRowElement) : RowBindings{
    // Gets the points
    var points = getNumberFromInput(F<HTMLInputElement>("input",F(".value",row)), 0);
    // Gets the added bonus/malus-points
    var bonmal = getNumberFromInput(F<HTMLInputElement>("input",F(".bon-mal",row)), 0);
    // Gets the name
    var name = F<HTMLInputElement>("input",F(".name",row)).value;

    // Gets the display
    var disp = F<HTMLSpanElement>("span",F(".result",row));

    return {
        display: disp,
        points: points,
        malusBonusPoints: bonmal,
        name
    }
}