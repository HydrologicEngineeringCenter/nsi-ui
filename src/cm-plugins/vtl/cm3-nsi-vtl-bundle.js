import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Circle from 'ol/style/Circle'
import MVT from 'ol/format/MVT';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import Feature from 'ol/Feature';

const apiHost=process.env.REACT_APP_APIHOST_TILES
const NSI_VTL_INITALIZE_START='NSI_VTL_INITALIZE_START';
const NSI_VTL_INITALIZE_END='NSI_VTL_INITALIZE_END';
const MAP_INITIALIZED='MAP_INITIALIZED';

// VTL - Vector Tile Layer
export default{
  name:'vtl',
  
  getReducer: () => {
    const initialData = {
      _shouldInitialize: false,
    };
    return (state = initialData, { type, payload }) => {
      switch(type){
        case NSI_VTL_INITALIZE_START:
        case NSI_VTL_INITALIZE_END:
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

  // action creator
  doNsiVTLInitialize: () => ({ dispatch, store, anonGet }) => {
    dispatch({
      type: NSI_VTL_INITALIZE_START,
      payload: {
        _shouldInitialize: false,
      }
    })
    initMap(store);
  },
  
  reactNsiVTLShouldInitialize: (state) => {
    if(state.vtl._shouldInitialize) return { actionCreator: "doNsiVTLInitialize" };
  }
};

const nsiLayers={
  'NSIP1':`${apiHost}nsi1/tiles/{z}/{x}/{y}.pbf`,
  'NSIP2':`${apiHost}nsi2/tiles/{z}/{x}/{y}.pbf`,
}

const initMap=function(store){

  ////////////////////
  ////  Styling
  ////////////////////
  let fRes = new Fill({
    color: 'pink'
  });

  let styleRes = new Style({
    image: new Circle({
      radius:2,
      fill: fRes,
    }),
    fill:fRes,
  });

  let fCom = new Fill({
    color: 'blue'
  });

  let styleCom = new Style({
    image: new Circle({
      radius:2,
      fill: fCom,
    }),
    fill:fCom,
  });

  let fInd = new Fill({
    color: 'yellow'
  });

  let styleInd = new Style({
    image: new Circle({
    radius:2,
    fill: fInd,
    }),
    fill:fInd,
  });

  let fPub = new Fill({
    color: 'green'
  });

  let stylePub = new Style({
    image: new Circle({
    radius:2,
    fill: fPub,
    }),
    fill:fPub,
  });

  ////////////////////
  ////  VTL
  ////////////////////
  let layer=new VectorTileLayer({
    style: function(feature, resolution){
     if (feature.values_.st_damcat === "RES"){
       return styleRes
     }else if (feature.values_.st_damcat === "PUB"){
       return stylePub
     }else if (feature.values_.st_damcat === "IND"){
      return styleInd
     }else {
       return styleCom
     }
    },
    // can use minZoom and maxZoom to optimize
    // resource usage here
    source: new VectorTileSource({
      attributions: 'USACE',
      maxZoom:15,
      // default use RenderFeature, switch to ol/Feature for compatibility with Select() in the state mask
      format: new MVT({featureClass:Feature}), 
      url: nsiLayers.NSIP1,
    })
  })

  const parentUid = store.selectTreeViewRootId();

  store.doAddLayer({
    displayName: 'NSI VTL 1',
    parentUid: parentUid,
    type:"notfolder",
    mapLayer: layer,
    visible: true,
    zoomTo: false, // error if set to true - getExtent not available in store
  })
};