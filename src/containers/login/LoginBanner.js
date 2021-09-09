import React from 'react';
import { connect } from 'redux-bundler-react';
import mapper from '../../resources/GeoFDA_Icon.ico';
import cwbiLogo from '../../resources/CWBI_Logo_160x160.png';

import "../main/main.css";
import classes from "./LoginBanner.module.css"

class LoginBanner extends React.Component {

  render() {
    const { doAuthFetchTokens, authNSIToken } = this.props;
    const authIsLoggedIn = (authNSIToken) ? true : false; //check if NSI is logged on?
    return (
      <nav className="navbar navbar=expand-lg navbar-dark nv-bg">

        <div className="nav float-left">
          <a href=""><img src={mapper} alt="NSI LOGO" style={{ width: '45px' }} /></a>
          <a className="navbar-brand" href="" style={{ paddingLeft: "15px", fontSize: '25px' }}><b>National Structure Inventory</b></a>
        </div>

        <div className="nav pull-right">
          <div> </div>
          <img className={classes["cwbi-logo"]} title="Powered By Civil Works Business Intelligence" src={cwbiLogo} alt="CWBI LOGO" />

        </div>

      </nav>
    )
  }
}

export default connect(
  'doAuthFetchTokens',
  'selectAuthNSIToken',
  LoginBanner
);