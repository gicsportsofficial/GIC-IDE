export function toArray<T>(item: T | Array<T>): Array<T> {
    return Array.isArray(item) ? item : [item];
}
