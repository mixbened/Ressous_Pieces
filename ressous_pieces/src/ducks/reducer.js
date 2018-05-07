import axios from 'axios';

const initialState = {
    userStats: [],
    username: '',
    user_id: ''
}

const UPDATE_STATS = 'UPDATE_STATS';
const UPDATE_USER = 'UPDATE_USER';

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

function reducer(state= initialState, action){
    switch(action.type){
        case UPDATE_STATS:
        return {...state, userStats: action.payload}
        case UPDATE_USER:
        return {...state, username: action.payload.username, user_id: action.payload.user_id}
        default:
        return state;
    }
}

export default reducer;