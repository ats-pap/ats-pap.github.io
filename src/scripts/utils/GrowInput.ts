import { create as C } from "./HTMLBuilder";
import { StrongInputValidator } from "./StrongInputValidator";
import { F, FA } from "./Utils"

function onWrite(elm: HTMLInputElement, ref: HTMLSpanElement){
    setTimeout(()=>ref.textContent=elm.value);   
}

function onPreInit(){
    // Replaces all grow-input-tags
    for(var raw of Array.from(FA("GrowInput"))){
        // Will hold all attributes
        var attributes : {[key:string]:string} = {}
        // Gets these attributes
        for(var attr of (raw.attributes as any as Iterable<Attr>))
            if(attr.name !== "class")
                attributes[attr.name] = attr.value;
        
        // Creates the item
        var inp = createGrowInput(attributes);

        // Appends the class
        if(raw.classList.length > 0)
            inp.dom.classList.add(raw.classList.toString());

        // Replaces the item
        raw.parentElement!.replaceChild(inp.dom, raw);
    }
}

function createGrowInput(inputAttributes: {[key: string]: string} = {}){
    
    // Type of the input
    var type = inputAttributes["type"] || "text";
    
    // The element that takes care of the size
    var sizer = C("span", { attr: { tabindex: "-1" } });

    // Input
    var input = StrongInputValidator.bindEventTo(
        C<HTMLInputElement>("input", {attr: inputAttributes, evts: {
            "input": (evt: InputEvent)=> onWrite(evt.target as HTMLInputElement, sizer)
        }})
    );

    // Executes the first write to update the sizer
    onWrite(input,sizer);

    return {
        dom: C("div", {
            cls: "grow-input "+type,
            chld: [
                sizer,
                input
            ]
        }),
        input
    }
}

export const GrowInputs = {
    createGrowInput,
    onPreInit
}