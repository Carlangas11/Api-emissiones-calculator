export const objectHaveUndefined = (value: Object): boolean => {

    const props = Object.keys(value);
    return props.some(prop => value[prop] === undefined || value[prop] === null);
}