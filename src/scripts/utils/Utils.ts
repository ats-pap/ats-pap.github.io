// Removes shadow-elements from html-element-lists
export const SHADOW_FILTER = (elm: HTMLElement)=>!elm.classList.contains("shadow");

// Shorted version of the queryselector (F for find)
export function F<T extends HTMLElement>(query : string, base : HTMLElement = document.body) : T{
    return base.querySelector<T>(query) as T;
}

// Shorted version of the queryselector (FA for FindAll)
export function FA<T extends HTMLElement>(query : string, base : HTMLElement = document.body) {
    return base.querySelectorAll<T>(query);
}

// Takes in an html-element and returns the x-th parent-element of it
export function getXParent<T extends HTMLElement>(elm: HTMLElement, x: number) : T{
    var current = elm;

    for(var i = 0; i < x; i++)
        current = current.parentElement!;

    return current as T;
}

/**
 * Takes in a base element @param base to add or remove the @param event @param listener to based on the @param toggle bit
 */
export function toggleEventListener(base: HTMLElement, toggle: boolean, event: string, listener: any){
    if(toggle)
        base.addEventListener(event, listener);
    else
        base.removeEventListener(event, listener);
}


/**
 * Takes in a base element @param base to add or remove the @param className to based on the @param toggle bit
 */
export function toggleClass(base: HTMLElement, toggle: boolean, className: string){
    if(toggle)
        base.classList.add(className);
    else
        base.classList.remove(className);
}

// Takes in a string and returns it. However if the strings
// is longer than the max-length, it will be cut and three dots will be added
export function getShortName(base: string, maxLength: number){
    if(base.length <= maxLength)
        return base;
    return base.substring(maxLength)+"...";
}

// Takes in an number-input and gives back the value. If the value is invalid, the base value is returned
export function getNumberFromInput(input: HTMLInputElement, base: number){
    return isNaN(input.valueAsNumber) ? base : input.valueAsNumber;
}

// Takes in an url and convertes the content of that url to a base64-string
export const toDataURL = (url:string) => fetch(url, {mode: "no-cors"})
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob);
    }));

/**
 * Converts a data-url (Like base64) to a file with the given filename
 * @param dataurl the url
 * @param filename the filename to use
 * @returns the file that gets produced
 * 
 * Original from https://stackoverflow.com/a/38935990
 */
export function dataURLtoFile(dataurl: string, filename: string) {
    var arr = dataurl.split(','),
        mime = (arr[0] as any).match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
}

/**
 * Takes in a @param base of icons, a @param iconMapper to their icon-class and an html-element @param icon
 * to update it to their next value
 */
export function changeToNextIcon<T extends string,K extends string>(base: {[x in K]: T}, iconMapper: {[t in T]: string}, icon: HTMLElement){
     // Gets the current icon
     var iconType = icon.dataset.type as T;
 
    // Gets the values and keys
    var values = Object.values(base)
    var keys = Object.keys(base);

     // Gets the next icon-index
     var next = values.indexOf(iconType)+1;
 
     if(next >= keys.length)
         next=0;
 
     // Gets the next icon
     var nxtIcon = values[next] as T;
 
     // Updates the icons data value and class
     icon.dataset.type = nxtIcon;
     icon.className = iconMapper[nxtIcon];
}