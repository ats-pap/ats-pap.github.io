/**
 * Small file with small utilities to build html-elements using javascript.
 * This is used in place of a big framework which would benefit little but contribute with a big size.
 */

export type CreateArguments = {
    cls?: string,
    id?: string,
    chld?: (HTMLElement|undefined)[],
    attr?: {[key: string]: any},
    evts?: {[key: string]: any},
    text?: string
}

/**
 * Function to create html-element with little code
 * 
 * @param {String} tag HTML-Tag name 
 * @param {String} cls (Optional) a class to append to the element
 * @param {String} id (Optional) an id to append to the element
 * @param {Array[HTMLElement]} chld (Optional) children to append to the element
 * @param {Object} attr (Optional) attributes to append to the element
 * @param {Object} evts (Optional) events to append to the element
 * @param {String} text (Optional) text to set as the textContent of the element
 * @returns the fully created HTML-Element
 */
export function create<T extends HTMLElement>(tag: string, {cls,id,text,chld,attr,evts}: CreateArguments = {}) : T{
    // Creates the element
    var elm = document.createElement(tag);

    // Appends class
    if(cls)
        elm.className = cls;

    // Appends id
    if(id)
        elm.id=id;

    // Appends text
    if(text)
        elm.textContent = text;

    // Appends children
    if(chld !== undefined)
        for(var child of chld)
        if(child !== undefined)
            elm.appendChild(child);

    // Appends attributes
    for(var attribute in attr){
        // Gets value
        var val = attr[attribute as keyof typeof attr];
        if(val !== undefined)
            elm.setAttribute(attribute,val);
    }
        
    // Appends events
    for(var z in evts){
        var handler = evts[z as keyof typeof evts];
        if(handler !== undefined)
            elm.addEventListener(z, handler);
    }

    return elm as T;
}


// Executes the html-create callback if the condition is true
export function createIf(cb: ()=>HTMLElement, condition: boolean){
    return condition ? cb() : undefined;
}

// Executes either the true or false html-callback depending on the given condition
export function createIfElse(cbTrue: ()=>HTMLElement, cbFalse: ()=>HTMLElement, condition: boolean){
    return condition ? cbTrue() : cbFalse();
}