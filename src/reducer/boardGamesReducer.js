export default function boardGamesReducer(state, action) {
    switch (action.type) {
        case 'LOAD_BOARDGAMES':
            return action.payload;
        case 'ADD_BOARDGAME':
            return [...state, action.payload]
        case 'REMOVE_BOARDGAME':
            return state.filter(t => t.id !== action.payload);
        case 'UPDATE_BOARDGAME':
            return state.map(t => t.id === action.payload.id ? action.payload : t);
        default:
            return state;
    }
};