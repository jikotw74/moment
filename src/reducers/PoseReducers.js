const initialState = { 
    todos: [], 
    idCounter: 0 
};

export todos(state = initialState, action) =>{
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: [
                    ...state.todos,
                    { text: action.payload, id: state.idCounter + 1 }
                ],
                idCounter: state.idCounter + 1
            };
        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            };
        default:
            return state;
    }
}