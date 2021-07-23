import React from 'react';
import { connect } from 'redux-bundler-react';
import mapper from '../../resources/GeoFDA_Icon.ico';
class Banner extends React.Component{
    render(){
        return (
            <nav className="navbar navbar=expand-lg navbar-dark bg-dark">
                <div className="float-left">
                    <a href = "/"><img src={mapper} alt="NSI LOGO" style={{width:'36px'}}/></a>
                    <a className="navbar-brand" href="/" style={{paddingLeft:"15px", fontSize:'25px'}}><b>National Structure Inventory</b></a>           
                </div>
            </nav>
        )
    }
}
export default connect(
    Banner
);