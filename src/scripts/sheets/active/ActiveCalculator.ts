import { getUiBindings } from "../../UiBindings";
import { ScheduledExecutor } from "../../utils/DelayedExecutor";
import { getNumberFromInput, toggleClass } from "../../utils/Utils";

// Calculates the health
const HEALTH_CALCULATOR = new ScheduledExecutor();
function healthCalculatorExec(){
    // Gets the html-bindings
    var { armor: armorInp, base: baseInp, damage: damageInp, display } = getUiBindings().active.health;

    // Gets the values
    var armor = getNumberFromInput(armorInp, 0);
    var base = getNumberFromInput(baseInp, 0);
    var damage = getNumberFromInput(damageInp, 0);

    // Calculates the health-left
    var hpLeft = base + armor - damage;

    // Updates the display
    display.textContent = hpLeft.toString();
    toggleClass(display.parentElement!, hpLeft <= 0, "negative");
}

// Recalcs how much health the player has
export function recalcHealth(){
    HEALTH_CALCULATOR.run(healthCalculatorExec);
}