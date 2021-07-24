const census = require("citysdk")
import {toLonLat} from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Select from 'ol/interaction/Select';
import {click} from 'ol/events/condition';
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
    }
  };

const initMap=function(store){
  const map = store.selectMap();
  const vl = new VectorLayer({
    source: new VectorSource({
      format: new GeoJSON(),
      url: 'https://raw.githubusercontent.com/uscensusbureau/citysdk/master/v2/GeoJSON/20m/2017/state.json'
    })
  })
  const selectSingleClick = new Select();
    // select interaction working on "click"
    map.addLayer(vl)
    selectSingleClick.on('select', function(e) {
        var statefips = e.selected[0].values_.STATEFP
        var url = `https://prod.mmc.usace.army.mil/files/nsiv2/nsiv2_${statefips}.gpkg.7z`
        fetch(url,{mode:'no-cors'}).then(function(t) {
                var a = document.createElement("a");
                a.href = t;
                a.setAttribute("download", `${statefips}.gpkg.7z`);
                a.click();
            }
            );
    });
    map.addInteraction(selectSingleClick)
};