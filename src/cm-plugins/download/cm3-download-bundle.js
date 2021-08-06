import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Select from 'ol/interaction/Select';
import Overlay from 'ol/Overlay';

const downloadUrlTemplate=process.env.REACT_APP_APIHOST_NSI_STATE_GEOPKG_URL_TEMPLATE;
const NSI_DOWNLOAD_INITALIZE_START='NSI_DOWNLOAD_INITALIZE_START';
const NSI_DOWNLOAD_INITALIZE_END='NSI_DOWNLOAD_INITALIZE_END';
const MAP_INITIALIZED='MAP_INITIALIZED';

export default{

    name:'nsidownload',

    getReducer: () => {
      const initialData = {
        _shouldInitialize: false,
      };
      return (state = initialData, { type, payload }) => {
        switch(type){
          case NSI_DOWNLOAD_INITALIZE_START:
          case NSI_DOWNLOAD_INITALIZE_END:
            return Object.assign({}, state, payload);
          case MAP_INITIALIZED:
            return Object.assign({}, state, {
              _shouldInitialize: true
            })
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
      if(state.nsidownload._shouldInitialize) return { actionCreator: "doNsiDownloadInitialize" };
    },

    // work around to uncaught TypeError in corpsmap
    selectMapLoading: () => {
      return;
    }

  };

const initMap=function(store){

  const map = store.selectMap();

  // state mask
  const vl = new VectorLayer({
    source: new VectorSource({
      format: new GeoJSON(),
      url: 'https://raw.githubusercontent.com/uscensusbureau/citysdk/master/v2/GeoJSON/20m/2017/state.json'
    })
  })
  
  const container = document.getElementById('popup');
  const content = document.getElementById('popup-content');
  const closer = document.getElementById('popup-closer');
  const confirm = document.getElementById('download-confirm');

  const overlay = new Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
      duration: 250,
    },
  });
  overlay.setPosition(undefined);

  map.addLayer(vl);
  map.addOverlay(overlay);

  //////////////////////////////
  // Pop-up
  //////////////////////////////
  const selectSingleClick = new Select();

  map.addInteraction(selectSingleClick);

  selectSingleClick.on('select', function(evt) {

    console.log(Object.getOwnPropertyNames(evt));

    const state = evt.selected[0].values_.NAME
    const statefips = evt.selected[0].values_.STATEFP

    // extent_ returns 2 pairs of coordinates
    // averaging the 2 pairs returns the center of selected polygon
    const extentCoords = evt.selected[0].values_.geometry.extent_
    const extentCoords0 = [0,1].map(x=>extentCoords[x])
    const extentCoords1 = [2,3].map(x=>extentCoords[x])
    const overlayCoord = [(extentCoords0[0]+extentCoords1[0])/2,(extentCoords0[1]+extentCoords1[1])/2]

  // pop-up on click
  content.innerHTML = '<p>Download structure data for <div><code>' + state + '</code> ?</div></p>';
  overlay.setPosition(overlayCoord);

  // Reset popup
  function closeDownPopUp () {
    overlay.setPosition(undefined);
    closer.blur();
    selectSingleClick.getFeatures().clear(); // clear selected state
    return false;
  }

  // Map closeDownPopUp to cancel button
  closer.onclick = closeDownPopUp;

  // Download button initiates download and closeDownPopUp
  confirm.onclick = function () {
    const url = downloadUrlTemplate.replace('{statefips}', statefips);

    // create hidden hyperlink and download data
    const a = document.createElement("a");
    a.href = url;
    a.setAttribute("download", `${statefips}.gpkg.7z`);
    a.click();
  
    closeDownPopUp();
    };
  });
}