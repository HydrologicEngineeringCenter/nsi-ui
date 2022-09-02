import { createRouteBundle } from 'redux-bundler'
import MainPage from '../containers/main/main'
import FourOhFour from '../containers/404'

// comment line 9 and uncomment the 2 lines below to use settings from package.json
// import settings from "../../package.json"
// const base = settings.homepage

const base = process.env.REACT_APP_HOMEPAGE

console.log(base)

var routeObj = {}
routeObj["/" + base] = MainPage
routeObj["/" + base + "/"] = MainPage
routeObj["*"] = FourOhFour

console.log(routeObj)

const routes = createRouteBundle(routeObj)

export { routes as default }
