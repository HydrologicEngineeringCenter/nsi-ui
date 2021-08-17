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
    doUpdateUrl("/");
  }

  return (
    <div >
      <Banner/>
      <Map/>
      {/* <DownloadConfirmationPopUp showPopup={showPopup} showConfirm={showConfirm} /> */}
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