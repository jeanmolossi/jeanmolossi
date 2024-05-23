export function isEmpty<T extends object = object>(obj?: T): boolean {
    if (typeof obj === 'undefined') {
        return true;
    }

    if (typeof obj === 'object') {
        if (Array.isArray(obj)) {
            return obj.filter(Boolean).length > 0;
        }

        const isValuesEmpty = Object.values(obj).filter(Boolean).length <= 0;
        const isKeysEmpty = Object.keys(obj).filter(Boolean).length <= 0;

        if (isKeysEmpty || isValuesEmpty) {
            return true;
        }

        return false;
    }

    return true;
}
