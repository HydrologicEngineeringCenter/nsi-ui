import React from 'react';
import { connect } from 'redux-bundler-react';
import mapper from '../../resources/GeoFDA_Icon.ico';
import cwbiLogo from "../../resources/CWBI_Logo_160x160.png";
import './main.css';
import classes from "../login/LoginBanner.module.css";


class Banner extends React.Component {
  render() {
    return (
      <nav className="navbar navbar=expand-lg navbar-dark bg-dark nv-bg">
        <div className="nav float-left">
          <a href=""><img src={mapper} alt="NSI LOGO" style={{ width: '45px' }} /></a>
          <a className="navbar-brand" href="" style={{ paddingLeft: "15px", fontSize: '25px' }}><b>National Structure Inventory</b></a>
        </div>
        <div className="nav pull-right">

          <a
            className="btn btn-secondary" // gray outline
            href="https://www.hec.usace.army.mil/fwlink/?linkid=nsi-download-tool"
            target="_blank" // open in new tab
            style={{ fontSize: '1rem' }}>
            Help
          </a>

          <img className={classes["cwbi-logo"]} title="Powered By Civil Works Business Intelligence" src={cwbiLogo} alt="CWBI LOGO" />

        </div>
      </nav>
    )
  }
}
export default connect(
  Banner
);