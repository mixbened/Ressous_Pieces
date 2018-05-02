const initialState = {
    checked: 0,
    unchecked: 0
}

const UPDATE_STATS = 'UPDATE_STATS';

export function updateStats(stats){
    return {
        type: UPDATE_STATS,
        payload: stats
    }
}

function reducer(state= initialState, action){
    switch(action.type){
        case UPDATE_STATS:
        console.log('reducer', action.payload[0], action.payload[1])
        return {...state, unchecked: action.payload[0], checked: action.payload[1]}
        default:
        return state;
    }
}

export default reducer;