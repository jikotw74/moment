export const ADD_TODO = 'ADD_TODO';
export addTodo(text) => {
    return {
        type: ADD_TODO,
        payload: {
            text
        }
    };
}