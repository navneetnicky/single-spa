import React from 'react';
import ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import Root from './Root';

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: Root,
  domElementGetter: () => document.getElementById('single-spa-application'),
  errorBoundary(err, info, props) {
    console.error('Error in Vite app:', err);
    return (
      <div style={{ padding: '20px', background: '#fee', border: '1px solid red' }}>
        <h2>Error in Vite (React 18) Application</h2>
        <p>{err.message}</p>
      </div>
    );
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
