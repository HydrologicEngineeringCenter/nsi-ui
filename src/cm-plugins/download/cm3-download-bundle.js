import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Select from 'ol/interaction/Select';
import Overlay from 'ol/Overlay';
import { createSelector } from 'redux-bundler';
import DownloadConfirmationPopUp from './DownloadConfirmationPopUp';
import { renderToString } from 'react-dom/server';

const apiHost = process.env.REACT_APP_NSI_DOWNLOAD_APIHOST;
const route = process.env.REACT_APP_NSI_DOWNLOAD_ROUTE;
const fileNameTemplate = process.env.REACT_APP_NSI_DOWNLOAD_FILE_NAME_TEMPLATE;
const NSI_DOWNLOAD_INITALIZE_START = 'NSI_DOWNLOAD_INITALIZE_START';
const NSI_DOWNLOAD_INITALIZE_END = 'NSI_DOWNLOAD_INITALIZE_END';
const MAP_INITIALIZED = 'MAP_INITIALIZED';

const NSI_DOWNLOAD_UPDATE_POPUP = 'NSI_DOWNLOAD_UPDATE_POPUP';

export default {

  name: 'nsidownload',

  getReducer: () => {
    const initialData = {
      _shouldInitialize: false,
      _showPopup: true,
      _showConfirm: true
    };

    return (state = initialData, { type, payload }) => {
      switch (type) {
        case NSI_DOWNLOAD_INITALIZE_START:
        case NSI_DOWNLOAD_INITALIZE_END:
          return Object.assign({}, state, payload);
        case MAP_INITIALIZED:
          return Object.assign({}, state, {
            _shouldInitialize: true
          })
        case NSI_DOWNLOAD_UPDATE_POPUP:
          return Object.assign({}, state, payload);
        default:
          return state;
      }
    }
  },

  doNsiDownloadInitialize: () => ({ dispatch, store, anonGet }) => {
    dispatch({
      type: NSI_DOWNLOAD_INITALIZE_START,
      payload: {
        _shouldInitialize: false,
      }
    })
    initMap(store);
  },

  reactNsiDownloadShouldInitialize: (state) => {
    if (state.nsidownload._shouldInitialize) return { actionCreator: "doNsiDownloadInitialize" };
  },

  ////////////////////////////////////////////////////////////
  // Incorporate popup for easier state access from 
  // other places in the component tree
  ////////////////////////////////////////////////////////////
  doShowPopup: () => ({ dispatch }) => {
    dispatch({
      type: NSI_DOWNLOAD_UPDATE_POPUP,
      payload: {
        _showPopup: true,
      }
    })
  },

  doHidePopup: () => ({ dispatch }) => {
    dispatch({
      type: NSI_DOWNLOAD_UPDATE_POPUP,
      payload: {
        _showPopup: false,
      }
    })
  },

  doShowConfirm: () => ({ dispatch }) => {
    dispatch({
      type: NSI_DOWNLOAD_UPDATE_POPUP,
      payload: {
        _showConfirm: true,
      }
    })
  },

  doHideConfirm: () => ({ dispatch }) => {
    dispatch({
      type: NSI_DOWNLOAD_UPDATE_POPUP,
      payload: {
        _showConfirm: false,
      }
    })
  },

  selectNSIDownload: state => state.nsidownload,

  selectShowPopup: createSelector(
    'selectNSIDownload',
    downloaderData => downloaderData._showPopup
  ),

  selectShowConfirm: createSelector(
    'selectNSIDownload',
    downloaderData => downloaderData._showConfirm
  ),
};

// Forcing re-rendering
const renderPopup = ({ showPopup, showConfirm }, map, overlayCoord) => {

  const container = document.getElementById('download-confirm-popup');

  const overlay = new Overlay({
    element: container,
    // autopan options go here
    // disabled due to conflict with react
    // component must be fully rendered to 
    // correctly determine panning boundary
  });

  overlay.setPosition(overlayCoord);
  map.addOverlay(overlay);
  
  container.outerHTML = renderToString(
    <DownloadConfirmationPopUp showPopup={showPopup} showConfirm={showConfirm} />
  )
}

// clear selection + close down popup
const closePopup = (clickEvent, map) => {
  renderPopup({showPopup:false, showConfirm:true}, map, undefined);
  clickEvent.getFeatures().clear();
}

const initMap = store => {

  const map = store.selectMap();

  // state mask
  const vl = new VectorLayer({
    source: new VectorSource({
      format: new GeoJSON(),
      url: 'https://raw.githubusercontent.com/uscensusbureau/citysdk/master/v2/GeoJSON/20m/2017/state.json'
    })
  })

  map.addLayer(vl);

  //////////////////////////////
  // Pop-up
  //////////////////////////////
  const selectSingleClick = new Select();

  map.addInteraction(selectSingleClick);

  selectSingleClick.on('select', function (evt) {

    // if clicked on the state mask, evt is a SelectEvent obj
    // if clicked on vtl, evt is a RenderFeature obj
    // RenderFeature is not compatible with Select(), solution is to switch to ol/Feature
    // https://github.com/openlayers/openlayers/issues/9840
    if (evt.selected[0] === undefined) { // click outside the state mask
      store.doHidePopup();
      closePopup(selectSingleClick, map);
    } else if (evt.selected[0].values_.NAME === undefined) { // clicked on vtl
      store.doHidePopup(); // no re-render, only change state
    } else {
      store.doShowPopup();

      const state = evt.selected[0].values_.NAME
      const statefips = evt.selected[0].values_.STATEFP

      if (state === 'Puerto Rico') {
        store.doHideConfirm();
        var popupPrompt = '<p>Data for ' + state + ' is not available</p>';
      } else {
        store.doShowConfirm();
        var popupPrompt = '<p>Download structure data for ' + state + '?</p>';
      }

      // extent_ returns 2 pairs of coordinates
      // averaging the 2 pairs returns the center of selected polygon
      const extentCoords = evt.selected[0].values_.geometry.extent_
      const extentCoords0 = [0, 1].map(x => extentCoords[x])
      const extentCoords1 = [2, 3].map(x => extentCoords[x])

      if (state === 'Alaska') { // const and let are block scoped, var isn't
        var overlayCoord = [extentCoords0[0] + 2500000, (extentCoords0[1] + extentCoords1[1]) / 2]
      } else {
        var overlayCoord = [(extentCoords0[0] + extentCoords1[0]) / 2, (extentCoords0[1] + extentCoords1[1]) / 2]
      }

      // overlay.setPosition(overlayCoord);

      // Forcing component re-render using div selection as a workaround; unable to enable continual update 
      // from DownloadConfirmationPopUp.js - connection only established during map initialization, 
      // could be faulty selector implementation or conflict between openlayers and reactjs
      const showPopup = store.selectShowPopup();
      const showConfirm = store.selectShowConfirm();

      renderPopup({showPopup, showConfirm}, map, overlayCoord);

      if (showPopup) {
        const content = document.getElementById('popup-content');

        content.innerHTML = popupPrompt;

        // Map closeDownPopUp to cancel button
        const closer = document.getElementById('popup-closer');
        closer.onclick = () => closePopup(selectSingleClick, map);

        // Download button initiates download and closeDownPopUp
        if (showConfirm) {
          const confirm = document.getElementById('download-confirm');

          confirm.onclick = function () {

            const url = apiHost + route + fileNameTemplate.replace('{statefips}', statefips);

            // create hidden hyperlink and download data
            const a = document.createElement("a");
            a.href = url;
            a.click();

            store.doHidePopup();
            closePopup(selectSingleClick, map);
          };
        }
      }
    }
  });
}