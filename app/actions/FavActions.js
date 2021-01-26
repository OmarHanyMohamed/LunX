import {
    ADD_TO_FAV,
    REMOVE_FROM_FAV
} from './types';

export const add_to_fav = (data) => dispatch => {
    dispatch({
        type: ADD_TO_FAV,
        payload: {data}
    })
}

export const remove_from_fav = (item) => dispatch => {
    dispatch({
        type: REMOVE_FROM_FAV,
        payload: {item}
    })
}