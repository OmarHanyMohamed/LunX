import {
    LIKE_POST,
    DISLIKE_POST
} from '../actions/types';


const INITIAL_STATE = {
    count: 0,
    liked: null, 
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LIKE_POST:
            return {
                ...state,
               count: state.count + 1,
               liked: true
            }
        case DISLIKE_POST:
            return {
                ...state,
                count: state.count - 1,
                liked: false
            }
        default:
            return state;
    }
}