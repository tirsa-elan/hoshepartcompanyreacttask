export const headerRowData = {
    headerData: [],
    rowData: []
};

export function useReducerTableducer(state, action) {
    return {
        ...state,
        ...action
    };
}