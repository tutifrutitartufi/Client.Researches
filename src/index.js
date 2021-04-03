import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxPromise from "redux-promise";
import { BrowserRouter } from 'react-router-dom';

import { State } from './Contexts/Auth';
import Reducers from './Reducers';
import App from './App';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(Reducers)}>
        <BrowserRouter>
            <State>
                <App />
            </State>
        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);
