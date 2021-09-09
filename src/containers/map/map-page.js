import React from 'react';
import { connect } from 'redux-bundler-react';
import {
  Map,
  basemapSwitcher,
  coordDisplay,
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
// import nsiVTL from '../../cm-plugins/vtl/index'; // future feature

class MapPage extends React.Component {
  render() {
    return (
      <div className="container-fluid" style={{ padding: "0" }}>
        <Map
          theme="grey"
          plugins={[
            basemapSwitcher,
            coordDisplay,
            geocoder,
            identify,
            measureTools,
            rotateNorth,
            zoomInOut,
            zoomHome,
            zoomToBox,
            mapLoadingIndicator,
            download,
            // nsiVTL, // future feature
          ]}
        />
      </div>
    )
  }
}
export default connect(
  MapPage
);

