import React, { Fragment } from 'react';
import classes from './DownloadConfirmationPopUp.module.css';

const DownloadConfirmationPopUp = props => {

  const { showPopup, showConfirm } = props;

  return <div id="download-confirm-popup">
    {showPopup && <div
      className={`${classes.olPopup} ${props.className}`}
    >
      <div id="popup-content" className={classes['popup-text']}></div>

      {showConfirm && <button
        type="button"
        className={`${classes.btn} ${"btn btn-success"}`}
        id='download-confirm'
      >Download</button>}

      <button
        type="button"
        className={`${classes.btn} ${"btn btn-danger"}`}
        href="#"
        id="popup-closer">Cancel</button>

    </div>}
  </div>
}

export default DownloadConfirmationPopUp;
