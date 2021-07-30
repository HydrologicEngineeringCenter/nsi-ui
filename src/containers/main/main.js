import React from 'react';
import { connect } from 'redux-bundler-react';
import Map from '../map/map-page'
import Banner from './banner'

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
    </div>
  )
}

export default connect(
  'doUpdateUrl',
  'selectAuthNSIToken',
  MainPage
  );