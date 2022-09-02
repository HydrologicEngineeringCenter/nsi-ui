import React from 'react';
import { connect } from 'redux-bundler-react';
import Map from '../map/map-page'
import Banner from './banner'

function MainPage() {
  return (
    <div className="main-container">
      <Banner />
      <Map />
    </div>
  )
}

export default connect(
  'doUpdateUrl',
  'selectShowPopup',
  'selectShowConfirm',
  MainPage
);
