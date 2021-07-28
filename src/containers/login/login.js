  
import React from 'react';
import { connect } from 'redux-bundler-react';
import LoginBanner from './login-banner';
import USGDisclaimer from './USGDisclaimer';


class LoginPage extends React.Component {
  render(){
    return (
      <div >
        <LoginBanner/>
          <div className="container-fluid">
            <USGDisclaimer/>
          </div>
        </div>
    )
  }
}
export default connect(
  LoginPage
  );