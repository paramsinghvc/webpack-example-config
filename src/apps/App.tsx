import React from 'react';
import styled from 'styled-components';

import 'styles/index.scss';

const MainContainer = styled.section`
    background: lightsalmon;
    color: black;
    padding: 20px;
`;

interface IAppProps {
    isLogged: boolean;
    appName: string;
}

interface IAppState {
}

// @connect(mapStateToProps, mapDispatchToProps)
class App extends React.Component<IAppProps, IAppState> {
    state = {
    }

    renderTitle() {
        return <p>{this.props.appName}</p>;
    }

    render() {
        return pug`
            MainContainer
                section
                    h1 Hola Mundo
                    p It works!
        `;
    }
}

/* Applying the react hot loader conditionally on dev env only */
let defaultExport = App;

if (__DEV__) {
    const { hot } = require('react-hot-loader');
    defaultExport = hot(module)(App);
}

export default defaultExport;