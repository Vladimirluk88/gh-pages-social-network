export type FieldValidator = (value: string) => string | undefined

export const requiredFiled: FieldValidator = (value) => {
    if (value) {
        return undefined;
    }

    return "Field is required";
}

export const maxLength = (maxLength: number): FieldValidator => (value) => {
    if (value && value.length > maxLength) {
        return `Max len is ${maxLength} symb`;
    }
    return undefined
}