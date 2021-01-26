import {
    ADD_PROFILE_PIC
} from './types';

export const add_profile_data = (name) => dispatch => {
    dispatch({
        type: ADD_PROFILE_PIC,
        payload:  name 
    })
}
