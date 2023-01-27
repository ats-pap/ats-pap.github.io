/**
 * Takes in a @param base enum and an @param value-element from that enum.
 * Returns the next element in line after the given one
 */
export function changeToNext<T extends string,K extends string>(base: {[x in K]: T}, value: T){
    // Gets the values and keys
    var values = [];
    for(var x in base) values.push(base[x]);

    var keys = Object.keys(base);

    // Gets the next value-index
    var nextIdx = values.indexOf(value)+1;

    if(nextIdx >= keys.length)
        nextIdx=0;

    // Gets the next value
    var nextValue = values[nextIdx] as T;

    return nextValue;
}

// Takes in a string and returns it. However if the strings
// is longer than the max-length, it will be cut and three dots will be added
export function getShortName(base: string, maxLength: number){
    if(base.length <= maxLength)
        return base;
    return base.substring(maxLength)+"...";
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