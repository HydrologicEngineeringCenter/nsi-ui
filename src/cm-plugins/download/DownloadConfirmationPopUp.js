import React from 'react';
import classes from './DownloadConfirmationPopUp.module.css';

const DownloadConfirmationPopUp = props => {
    return <div>
      <div
          id="popup"
          className={`${classes.olPopup} ${props.className}`}
          >
        <div id="popup-content" className={classes['popup-text']}></div>
        
        <button
          type="button"
          className={`${classes.btn} ${"btn btn-success"}`}
          id='download-confirm'
          >Download</button>

        <button
          type="button"
          className={`${classes['btn-cancel']} ${"btn btn-danger"}`}
          href="#"
          id="popup-closer">Cancel</button>

      </div>
    </div>
  }

export default DownloadConfirmationPopUp;
