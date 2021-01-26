import {
    USER_DATA
} from './types';

export const user_data = (bio, age, gender, chronic, allergy, smoker, history) => dispatch => {
    dispatch({
        type: USER_DATA,
        payload: { bio, age, gender, chronic, allergy, smoker, history }
    })
}
