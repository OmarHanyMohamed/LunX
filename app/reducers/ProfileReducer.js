import {
    USER_DATA
} from '../actions/types';


const INITIAL_STATE = {
    bio: '',
    age: '',
    gender: '',
    chronic: '', 
    allergy: '',
    smoker: '',
    history: ''
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_DATA:
            return {
                ...state,
                bio: [action.payload.bio, ...state.bio],
                age: [action.payload.age, ...state.age],
                gender: [action.payload.gender, ...state.gender],
                chronic: [action.payload.chronic, ...state.chronic],
                allergy: [action.payload.allergy, ...state.allergy],
                smoker: [action.payload.smoker, ...state.smoker],
                history: [action.payload.history, ...state.history]
            }
        default:
            return state;
    }
}