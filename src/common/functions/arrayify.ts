export const arrayify = <T>(arr: T | T[]): T[] => {
    return Array.isArray(arr) ? arr : [arr];
};
