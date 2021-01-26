import {
    LIKE_POST,
    DISLIKE_POST
} from './types';

export const like = (count) => dispatch => {
    dispatch({
        type: LIKE_POST,
        payload: count
    })
}

export const dislike = (count) => dispatch => {
    dispatch({
        type: DISLIKE_POST,
        payload: count
    })
}