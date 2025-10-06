export default function videoGameReducer(state, action) {
    switch (action.type) {
        case 'LOAD_VIDEOGAMES':
            return action.payload;
        case 'ADD_VIDEOGAME':
            return [...state, action.payload]
        case 'REMOVE_VIDEOGAME':
            return state.filter(t => t.id !== action.payload);
        case 'UPDATE_VIDEOGAME':
            return state.map(t => t.id === action.payload.id ? action.payload : t);
        default:
            return state;
    }
};