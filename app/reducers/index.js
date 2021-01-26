import { combineReducers } from 'redux';

import FavReducer from './FavReducer';
import LikeReducer from './LikeReducer';
import AuthReducer from './AuthReducer'
import ProfileReducer from './ProfileReducer'

export default combineReducers({
    fav: FavReducer,
    like: LikeReducer,
    auth: AuthReducer,
    profile: ProfileReducer
});