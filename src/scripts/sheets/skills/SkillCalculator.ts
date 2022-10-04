import { getUiBindings, SkillTable, SkillTableCollection, SkillTableKey } from "../../UiBindings";
import { ScheduledExecutor } from "../../utils/DelayedExecutor";
import { F, FA, getNumberFromInput, toggleClass } from "../../utils/Utils";
import { getRowImportants, getTableRows, RowBindings } from "./SkillUtils";

// Takes in the binds of a table and recalculates it
function recalcTable(binds: SkillTable){

    // Gets all given rows
    var rows = getTableRows(binds).map(getRowImportants as ()=>RowBindings);

    // Calculates the category points
    var categoryPoints = Math.round(rows.map(row=>row.points).reduce((a,b)=>a+b, 0) / 10);

    // Calculates the category-mind-flashes
    var mindflashes = Math.round(categoryPoints/10);

    // Iterates over all rows
    for(var row of rows){
        // Calculates the final points (Based on the row-points and category-points)
        var result = row.points + row.malusBonusPoints + categoryPoints;

        // Displays that number
        row.display.textContent = result.toString();

        // Updates the display-style
        toggleClass(row.display, result < 0, "negative");        
    }

    // Returns if the amount of mind-flashes are full
    function areMindFlashesFull(){
        // Gets the amount of available flashes
        var amtFlashes = parseInt(binds.mindflashesTotal.textContent as string);
        
        if(isNaN(amtFlashes))
            return false;

        // Gets the amount of flashes left
        var amtLeft = binds.mindflashesLeft.valueAsNumber;
        
        if(isNaN(amtLeft))
            return false;

        return amtLeft === amtFlashes;
    }


    // Updates the flashes left, if they were full or are greater than the current amount left
    if(areMindFlashesFull() || binds.mindflashesLeft.valueAsNumber > mindflashes)
        binds.mindflashesLeft.valueAsNumber = mindflashes;


    // Updates the mind-flashes-display
    binds.mindflashesTotal.textContent = mindflashes.toString();

    // Updates the max-property
    binds.mindflashesLeft.max = mindflashes.toString();

    // Updates the category-points
    binds.categoryPoints.textContent = categoryPoints.toString();

}

// Recalcs how much points are left
const POINTS_CALCULATOR = new ScheduledExecutor();
function doCalcPointsLeft(){
    // Returns how many points got spent on the given category
    function calcCatPoints(cat: SkillTable){
        // Gets all rows and their points from them
        var points = getTableRows(cat).map(row=>getNumberFromInput(F("input",F(".value",row)),0));

        // Calculates how man points got spent
        return points.reduce((a,b)=>a+b,0);
    }

    // Gets the category-bindings and the points-elements
    var { tables, points } = getUiBindings().skills;

    // Calculates how many category-points got spent in all categorys
    var pointsSpent = Object.values(tables).map(calcCatPoints).reduce((a,b)=>a+b, 0);

    // Gets how many are allowed to be spent
    var allowed = getNumberFromInput(points.allowed, 0);

    // Calculates how many can still be spent
    var ptsleft = allowed-pointsSpent;

    // Updates the display
    points.spent.textContent = ptsleft.toString();
    toggleClass(points.spent, ptsleft < 0, "negative");
}

export function recalcPointsLeft(){
    POINTS_CALCULATOR.run(doCalcPointsLeft);
}

// Calculators for all tables
const TBL_CALCULATORS: {
    [x in SkillTableKey]: ScheduledExecutor
} = {
    act: new ScheduledExecutor(),
    science: new ScheduledExecutor(),
    social: new ScheduledExecutor(),
}

export const recalcSkillTable = (key: SkillTableKey)=>(
    TBL_CALCULATORS[key].run(()=>recalcTable(getUiBindings().skills.tables[key]))
)