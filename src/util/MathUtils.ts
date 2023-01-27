// Clamps a number between an min and max. Both are inclusive
export function clamp(base: number, min: number, max: number) : number{
    if(base < min) return min;
    if(base > max) return max;
    return base;
}