import React from 'react';
import { connect } from 'redux-bundler-react';
import {
  Map,
  addData,
  basemapSwitcher,
  coordDisplay,
  draw,
  treeView,
  geocoder,
  identify,
  measureTools,
  rotateNorth,
  zoomInOut,
  zoomHome,
  zoomToBox,
  mapLoadingIndicator
} from "@corpsmap/corpsmap";
import "@corpsmap/corpsmap/css/corpsmap.css";
import download from '../../cm-plugins/download';
import nsiVTL from '../../cm-plugins/vtl/index';

class MapPage extends React.Component {
  render(){
    return (
        <div className="container-fluid" style={{ padding: "0"}}>
            <Map
              theme="grey"
              plugins={[
                addData,
                basemapSwitcher,
                coordDisplay,
                draw,
                treeView(),
                geocoder,
                identify,
                measureTools,
                rotateNorth,
                zoomInOut,
                zoomHome,
                zoomToBox,
                mapLoadingIndicator,
                download,
                nsiVTL,
              ]}
            />        
        </div>
    )
  }
}
export default connect(
  MapPage
  );