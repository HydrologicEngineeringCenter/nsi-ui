import React from 'react';
import { connect } from 'redux-bundler-react';
import LoginBanner from './LoginBanner'
import NsiDisclaimer from './NsiDisclaimer';

function LoginPage() {
    return (
      <div className="lg-bg">
        <LoginBanner/>
          <div className="container-fluid">
            <NsiDisclaimer/>
          </div>
        </div>
    )
}

export default connect(
  LoginPage
);