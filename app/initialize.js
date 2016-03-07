import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import counterApp from './reducers';
import App from 'components/App';

import {createProxy} from 'react-proxy';
import deepForceUpdate from 'react-deep-force-update';

if (!window.store) {
  window.store = createStore(counterApp, 0);
} else {
  window.store.replaceReducer(counterApp);
}

var Root = React.createClass({
  render() {
    return <Provider store={window.store}>
      <App />
    </Provider>
  }
});

var first;

if (!window.proxy) {
  window.proxy = createProxy(Root);
  first = true;
} else {
  window.proxy.update(Root);
}

var Proxy = window.proxy.get();

setTimeout(function() {
  if (first) {
    window.rd = ReactDOM.render(
      <Proxy />,
      document.querySelector('#app')
    );
  } else {
    deepForceUpdate(rd);
  }
}, 250);
