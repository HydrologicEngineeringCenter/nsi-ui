import React from 'react';
import { connect } from 'redux-bundler-react';
import {
  Map,
  addData,
  basemapSwitcher,
  bookmarks,
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
  printMap,
  themeSwitcher
} from "@corpsmap/corpsmap";
import "@corpsmap/corpsmap/css/corpsmap.css";
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
              ]}
            />        
        </div>
    )
  }
}
export default connect(
  MapPage
  );