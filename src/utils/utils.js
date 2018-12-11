
export const getValueDeep = (obj, chain) => {

    let res = obj;

    chain.forEach((val) => {
        try {
            res = res[val];
        }
        catch {
            return undefined
        }

    });

    return res;
}

export const sortArrayOfObjects = (data, column, direction) => {

    const newData = [...data];

    const columnDecomp = column.split('.');

    newData.sort((a, b) => {
        let _a = getValueDeep(a, columnDecomp),
            _b = getValueDeep(b, columnDecomp);

        switch (true) {
            case (_a > _b):
                return direction ? 1 : -1;
            case (_a < _b):
                return direction ? -1 : 1;
            default:
                return 0;
        }
    });
    return newData;
}

export const filterText = (data, filters) => {

    return data.filter((val) =>
        Object.keys(filters).reduce((acc, filterName) => {
            return (!filters[filterName]) ? acc :
                acc && val[filterName].toString().includes(filters[filterName]);
        },
            true
        )
    );
}
