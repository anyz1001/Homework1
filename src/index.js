import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import store from './store';

const rootElement = document.getElementById('app');

const renderApp = (test) => {
  const App = require('./app')
  render(
    <AppContainer>
      <Provider store={store}>  
        <App />
      </Provider>
    </AppContainer>,
    test
  );
};

renderApp(rootElement);

if (module.hot) {
	module.hot.accept(
    './app.js',
    () => renderApp(rootElement)
  );
}