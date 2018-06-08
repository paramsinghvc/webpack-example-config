import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import App from 'apps/App';

declare global {
    var pug: any;
    var __DEV__: boolean;
    var __PROD__: boolean;
}


ReactDOM.render(<App />, document.getElementById('app'));


const enableDevTools = () => {
    if (__DEV__) {
        const { whyDidYouUpdate } = require('why-did-you-update');
        whyDidYouUpdate(React);
    }
}
