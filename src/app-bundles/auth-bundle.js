const UPDATE_AUTH_TOKEN = 'UPDATE_AUTH_TOKEN';
const authNSIHost=process.env.REACT_APP_NSI_AUTH_HOST
const appNSIId=process.env.REACT_APP_NSI_APPID

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

// A bundle can have:
//   name
//   reducer
//   action creator
//   selector (function for reading state)
//   init method

// doX - action
// selectX - selector

export default {
  name: 'auth', 
  getReducer: () => {
    const initialState = {
      loading: false,
      nsiToken:null
    }
    return (state = initialState, { type, payload }) => {
      switch(type){
        case UPDATE_AUTH_TOKEN:
          return({...state,...payload});
        default:
          return state;
      }
    }
  },
    doAuthFetchTokens:()=>({dispatch,store})=>{

        // console.log(`${authNSIHost}/${appNSIId}`); // debugging

        fetch(`${authNSIHost}/${appNSIId}`, { // fetch request / response objects
            method: 'get'
        }).then(function(response) {
            return response.text();
        }).then(function(data) {
            if(parseJwt(data)){
                // console.log("parsing data...") // debugging
                dispatch({type:UPDATE_AUTH_TOKEN,payload:{nsiToken:data}});
            }
        });      
    },
    selectAuthNSIToken:state=>state.auth.nsiToken
  }