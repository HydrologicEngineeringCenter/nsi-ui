import React from 'react';
import { connect } from 'redux-bundler-react';
import Map from '../map/map-page'
import Banner from './banner'
import { Fragment } from 'react';
import DownloadConfirmationPopUp from '../../cm-plugins/download/DownloadConfirmationPopUp';

function MainPage(props) {

  const {doUpdateUrl,authNSIToken, showPopup, showConfirm} = props;

  // not logged not
  if(!authNSIToken) {
    doUpdateUrl("/nsi");
  }

  return (
    <div className="main-container">
      <Banner/>
      <Map/>
    </div>
  )
}

export default connect(
  'doUpdateUrl',
  'selectAuthNSIToken',
  'selectShowPopup',
  'selectShowConfirm',
  MainPage
  );