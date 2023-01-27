// Returns a reference from a vue-component
export function getRef<T>(base: any, name: string) : T{
    return base.$refs[name] as T;
}