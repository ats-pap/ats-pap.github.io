import { FA } from "./Utils";

// Event: When something is written within the input-event
const onInput=(evt: InputEvent)=>{
    var elm = evt.target as HTMLInputElement;

    // Aborts if an invalid value gets detected
    if (!elm.validity.valid || (elm.maxLength > 0 && elm.value.length > elm.maxLength))
        elm.value = (elm as any).oldValue;

    // Sets the default value if a nan-value is detected
    if (elm.type === "numeric" && elm.valueAsNumber === NaN)
        elm.value = elm.min;

    (elm as any).oldValue = elm.value;
}

// Takes in an input-element and binds the validator-event to it
// Also returns the input-element to allow seamless chaining
function bindEventTo(input: HTMLInputElement){
    // Sets the base-value
    (input as any).oldValue = (input as HTMLInputElement).value;

    // Binds the event
    input.addEventListener("input", onInput as any);

    return input;
}

function preInit() {
    // Binds all existing inputs
    FA("input").forEach(bindEventTo as any);
}

export const StrongInputValidator = {
    preInit,
    bindEventTo
}