import React from 'react';
import { connect } from 'redux-bundler-react';

function App({ route }) {
  const Route = route;
  return (
    <>
      <Route />
    </>
  );
}

export default connect(
  'selectRoute',
  App
);
