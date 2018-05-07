import axios from 'axios';

const initialState = {
    userStats: [],
    username: '',
    user_id: '',
    ressents: []
}

const UPDATE_STATS = 'UPDATE_STATS';
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_RESSENTS = 'UPDATE_RESSENTS';

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

export const updateUser = (val) => {
        return {
            type: UPDATE_USER,
            payload: val
        }
}

export const updateRessents = (username) => {
    console.log('reducer runs update')
        return(dispatch) =>  {
            axios.get(`/api/ressents/${username}`).then(response => dispatch({
                type: UPDATE_RESSENTS,
                payload: response.data
            }))
        .catch(err => console.log('Error in Dispatch', err))
    }
}


function reducer(state= initialState, action){
    switch(action.type){
        case UPDATE_STATS:
        return {...state, userStats: action.payload}
        case UPDATE_USER:
        return {...state, username: action.payload.username, user_id: action.payload.user_id}
        case UPDATE_RESSENTS:
        return {...state, ressents: action.payload}
        default:
        return state;
    }
}

export default reducer;