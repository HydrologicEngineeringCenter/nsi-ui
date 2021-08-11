import {doRoutesUpdateUrl} from './routes-bundle';

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

export default {
  name: 'auth',
  getReducer: () => {
    const initialState = {
      loading: false,
      nsiToken:null,
      userName:null,
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
        fetch(`${authNSIHost}/${appNSIId}`, {
            method: 'get'
        }).then(function(response) {
            return response.text();
        }).then(function(data) {
            let claims = parseJwt(data);
            if(claims){
                dispatch({type:UPDATE_AUTH_TOKEN,payload:{nsiToken:data,userName:claims.name}});
                store.doUpdateUrl('/nsi/main')
            }
        });      
    },
    selectAuthNSIToken:state=>state.auth.nsiToken,
    selectAuthUserName:state=>state.auth.userName,
  }