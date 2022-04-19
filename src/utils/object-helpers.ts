export const updateObjectInArray = (
    items: any,
    userId: any,
    objPropName: any,
    newObjProps: any
) => {
    return items.map((e: any) => {
        if (e[objPropName] === userId) {
            return { ...e, ...newObjProps };
        }
        return e;
    });
};
