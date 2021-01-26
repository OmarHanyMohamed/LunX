import {
    ADD_TO_FAV,
    REMOVE_FROM_FAV
} from '../actions/types';


const INITIAL_STATE = {
    data: [],
    addedToFav: null, 
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_TO_FAV:
            return {
                ...state,
               data: [action.payload.data, ...state.data],
               addedToFav: true
            }
        case REMOVE_FROM_FAV:
            return {
                ...state,
                data: state.data.filter(item => item == action.payload),
                addedToFav: false
            }
        default:
            return state;
    }
}