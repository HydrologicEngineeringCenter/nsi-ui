import React from 'react';
import { connect } from 'redux-bundler-react';
import mapper from '../../resources/GeoFDA_Icon.ico';
class LoginBanner extends React.Component{

    render(){
        const { doAuthFetchTokens, authNSIToken} = this.props; // from bundle store
        const authIsLoggedIn = (authNSIToken)?true:false; //check if NSI is logged on?
        return (
            <nav className="navbar navbar=expand-lg navbar-dark bg-dark">
                <div className="float-left">
                    <a href = "/"><img src={mapper} alt="NSI LOGO" style={{width:'45px'}}/></a>
                    <a className="navbar-brand" href="/" style={{paddingLeft:"15px", fontSize:'25px'}}><b>NSI Survey Tool</b></a>           
                </div>
                <button className="btn btn-secondary mr-2" data-toggle="modal" data-target="#myModal" onClick={ doAuthFetchTokens } disabled ={ authIsLoggedIn} >
                    {(authIsLoggedIn)?
                        ("My Account"):
                        ("Sign In")
                    }
                    <i className='mdi mdi-account-circle' style={{fontSize:30,paddingLeft:"5px"}}/>
                </button>
            </nav>
        )
    }
}
export default connect(
    'doAuthFetchTokens',
    'selectAuthNSIToken',
    LoginBanner
);