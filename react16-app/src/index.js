import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import Root from './Root';

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  domElementGetter: () => document.getElementById('single-spa-application'),
  errorBoundary(err, info, props) {
    console.error('Error in React 16 app:', err);
    return (
      <div style={{ padding: '20px', background: '#fee', border: '1px solid red' }}>
        <h2>Error in React 16 Application</h2>
        <p>{err.message}</p>
      </div>
    );
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
