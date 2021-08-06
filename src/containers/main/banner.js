import React from 'react';
import { connect } from 'redux-bundler-react';
import mapper from '../../resources/GeoFDA_Icon.ico';
import './main.css';

class Banner extends React.Component{
    render(){
        return (
            <nav className="navbar navbar=expand-lg navbar-dark bg-dark">
                <div className="float-left">
                    <a href = "/"><img src={mapper} alt="NSI LOGO" style={{width:'36px'}}/></a>
                    <a className="navbar-brand" href="/" style={{paddingLeft:"15px", fontSize:'25px'}}><b>National Structure Inventory</b></a>           
                </div>
                <div className="nav pull-right">
                    <a 
                        class="btn btn-secondary" // gray outline
                        href="https://www.hec.usace.army.mil/fwlink/?linkid=nsi-download-tool"
                        target="_blank" // open in new tab
                        style={{fontSize:'10px'}}>
                        Help
                    </a>
                </div>
            </nav>
        )
    }
}
export default connect(
    Banner
);