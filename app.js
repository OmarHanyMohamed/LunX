import React, { Component } from 'react';
import Navigation from './app/Navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducers from './app/reducers';
import { YellowBox } from 'react-native';
import _ from 'lodash';

export default class app extends Component {
    render() {
        console.disableYellowBox = true;
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                <Navigation />
            </Provider>
        )
    }
}