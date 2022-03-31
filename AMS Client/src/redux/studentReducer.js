
const initialState = {
    student:[]
}

const studentReducer = (state = initialState, action) => {
    if (action.type === 'LOAD_STUDENT') {
        return { 
            ...state, 
            student: [action.payload]
        };
    }
    return state;
};

export default studentReducer;