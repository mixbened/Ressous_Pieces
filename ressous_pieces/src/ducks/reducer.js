import axios from 'axios';

const initialState = {
    userStats: []
}

const UPDATE_STATS = 'UPDATE_STATS';

export const updateStats = () => {
    console.log('reducer function runs')
        return(dispatch) =>  {
            axios.get(`/api/workspaces/`).then(data => dispatch({
            type: UPDATE_STATS,
            payload: [data.data.unchecked, data.data.check]
        }))
        .catch(err => console.log('Error in Dispatch', err))
    }
}

function reducer(state= initialState, action){
    switch(action.type){
        case UPDATE_STATS:
        return {...state, userStats: action.payload}
        default:
        return state;
    }
}

export default reducer;