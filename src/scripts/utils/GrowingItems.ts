

export interface Construct<T> {
    dom: HTMLElement,
    input: HTMLInputElement,
    with?: T
}

export type GrowItemSettings<T> = {
    // If items should be deleted if their input-field is empty
    autoDelete?: boolean,

    // Event: When a shadow element get's converted to a normal one
    onConvertShadow?: ElementEvent<T>
}

// Event-handler for simple events
type ElementEvent<T> = (constr: Construct<T>) => void;

// Supplier for new elements
// If the config-value is given, the element es a full normal element, otherwise a shadow-element
type ShadowSupplier<T, Cfg> = (config?: Cfg) => Construct<T>;

// Default settings for the grow-items
const DEFAULT_SETTINGS: GrowItemSettings<any> = {
    autoDelete: true,
}

export class GrowingItemSupplier<T, Cfg>{

    // Base-dom-binding to add all elements to
    private readonly base: HTMLElement;

    // Supplier for new shadow-elements
    private readonly supplier: ShadowSupplier<T, Cfg>;

    // Behavioural settings and event listeners
    private readonly settings: GrowItemSettings<T>;

    constructor(base: HTMLElement, supplier: ShadowSupplier<T, Cfg>, settings: GrowItemSettings<T> = {}) {
        this.base = base;
        this.supplier = supplier;
        this.settings = { ...DEFAULT_SETTINGS, ...settings };

        // Appends the first shadow-element
        this.appendShadow();
    }

    // Clears all grow-items
    public clear(){
        // Clears the base
        this.base.innerHTML="";
        // Appends a new shadow-element
        this.appendShadow();
    }

    // Adds a new element using the given config
    public addElement(config: Cfg){
        // Creates the element
        var elm = this.supplier(config);

        // Adds construct-reference to the input and dom-elements
        (elm.input as any).__grow_construct =
        (elm.dom as any).__grow_construct = elm;

        // Appends the autodelete change event if required
        if (this.settings.autoDelete)
            elm.input.addEventListener("change", this.onNormalChange as any);

        // Inserts the element before the shadow-element
        this.base.insertBefore(elm.dom, this.base.lastChild);
    }

    /**
     * Takes in an input-element @param input and
     * @returns the construct that belongs to it.
     */
    public getStructByInputOrDom(input: HTMLElement): Construct<T> {
        return (input as any).__grow_construct;
    }

    /**
     * Takes in the construct of a normal element and deletes it
     */
    public deleteNormalElement(constr: Construct<T>) {
        // Removes the from the dom
        constr.dom.parentElement!.removeChild(constr.dom);
    }


    // Event: When a normal element gets changed
    private onNormalChange = (evt: InputEvent) => {
        // Gets the struct
        var str: Construct<T> = (evt.target as any).__grow_construct;

        // Checks if the important field got deleted
        if ((evt.target as HTMLInputElement).value.trim().length <= 0)
            this.deleteNormalElement(str);
    }

    // Event: When a shadow element receives input
    private onShadowInput = (evt: InputEvent) => {

        // Gets the struct
        var str: Construct<T> = (evt.target as any).__grow_construct;

        // Makes it a normal element
        this.convertToNormalElement(str);

        // Appends the next shadow
        this.appendShadow();

        // Un and refocuses the element to send the first change event
        str.input.blur();
        str.input.focus();
    }

    // Converts a given shadow-element to a normal element
    private convertToNormalElement(constr: Construct<T>) {

        // Removes the shadow-listener
        constr.input.removeEventListener("input", this.onShadowInput as any);

        // Fires the event-handler
        if (this.settings.onConvertShadow !== undefined)
            this.settings.onConvertShadow(constr);

        // Appends the auto-delete event-handler if required
        if (this.settings.autoDelete)
            constr.input.addEventListener("change", this.onNormalChange as any);
    }

    // Appends a new shadow-element to the base
    private appendShadow() {
        // Creates the new element
        var elm = this.supplier();

        // Adds construct-reference to the input and dom-elements
        (elm.input as any).__grow_construct =
        (elm.dom as any).__grow_construct = elm;

        // Appends the shadow-events
        elm.input.addEventListener("input", this.onShadowInput as any);

        // Appends the element
        this.base.appendChild(elm.dom);
    }

}