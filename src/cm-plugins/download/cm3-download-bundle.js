const census = require("citysdk")
import {toLonLat} from 'ol/proj';
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
  map.on('singleclick',function(evt) {
      var f = evt.coordinate
      f = toLonLat(f)
      console.log(f)
      census(
          {
              vintage: "2017",
              geoHierarchy:{
                  county:{
                      lat: f[1],
                      lng: f[0]
                  }
              }
          }, function(error, response){
              if (!error){
                console.log(response)
                console.log(response.geoHierarchy)
                console.log(response.geoHierarchy.state)
                var statefips = response.geoHierarchy.state
                var url = `https://prod.mmc.usace.army.mil/files/nsiv2/nsiv2_${statefips}.gpkg.7z`
                console.log(url)
                fetch(url,null)
              }else{
                console.log(error)
              }
              
          }
      )
  })
};