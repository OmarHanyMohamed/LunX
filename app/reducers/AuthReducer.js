import {
    ADD_PROFILE_PIC
} from '../actions/types';


const INITIAL_STATE = {
    name: '',
    photo: null
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_PROFILE_PIC:
            return {
                ...state,
                name: action.payload.name,
            }
        default:
            return state;
    }
}