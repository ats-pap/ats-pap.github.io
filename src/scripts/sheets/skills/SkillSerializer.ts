import { SkillsSchema } from "../../serialisation/Schemas";
import { getUiBindings, SkillTable, SkillTableCollection, SkillTableKey } from "../../UiBindings";
import { getNumberFromInput } from "../../utils/Utils";
import { SheetSkills } from "../SheetSkills";
import { getRowImportants, getTableRows } from "./SkillUtils";

// Serializes a single row
function serializeTableItem(rawRow: HTMLTableRowElement){
    // Gets the important fields
    var row = getRowImportants(rawRow);

    return {
        name: row.name,
        points: row.points,
        bonusPoints: row.malusBonusPoints
    }
}

// Takes in a table-binding and serializes all values
const serializeTable = (tbl: SkillTable) => getTableRows(tbl).map(serializeTableItem);

// Deserializes the skills
export function deserializeSkills(raw: SkillsSchema){
    // Gets the ui-bindings
    var { points, tables} = getUiBindings().skills;

    // Sets the allowed points
    points.allowed.valueAsNumber = raw.allowedPoints;

    // Updates the tables
    SheetSkills.setSkillItems(raw.tables);

    // Updates the category-mindflashes
    for(var cat in raw.tables)
        tables[cat as SkillTableKey].mindflashesLeft.valueAsNumber = raw.tables[cat as SkillTableKey].mindflashes;
}

// Serializes all skills
export function serializeSkills(){
    // Gets the ui-bindings
    var { tables, points } = getUiBindings().skills;

    // Gets the amount of points the player is allowed to spent
    var allowedPoints = getNumberFromInput(points.allowed, 0);

    // Serializes a given category
    const serializeCategory = (category: SkillTableKey) => {return {
        items: serializeTable(tables[category]),
        mindflashes: getNumberFromInput(tables[category].mindflashesLeft, 0)
    }};

    return {
        allowedPoints,

        // Serializes the tables
        tables: (()=>{
            var obj : {[x in keyof SkillTableCollection]: any} = {} as any;
            for(var key in tables)
                obj[key as SkillTableKey] = serializeCategory(key as SkillTableKey);
            return obj;
        })()
    }
}