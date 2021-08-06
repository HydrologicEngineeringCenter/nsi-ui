import React from 'react';
import { connect } from 'redux-bundler-react';
import Map from '../map/map-page'
import Banner from './banner'
import DownloadConfirmationPopUp from '../../cm-plugins/download/DownloadConfirmationPopUp';

function MainPage(props) {

  const {doUpdateUrl,authNSIToken} = props;

  // not logged not
  if(!authNSIToken) {
    doUpdateUrl("/");
  }

  return (
    <div >
      <Banner/>
      <Map/>
      <DownloadConfirmationPopUp/>
    </div>
  )
}

export default connect(
  'doUpdateUrl',
  'selectAuthNSIToken',
  MainPage
  );