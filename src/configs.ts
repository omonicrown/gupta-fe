import { createBrowserHistory } from "history";

//API CALL TYPE
//const TYPE_LOCAL = "LOCAL";
const TYPE_REST = "REST";
//console.log(77, process.env.NODE_ENV);

//resources
// const API_URL =
//   process.env.NODE_ENV === "production" ? "" : "https://dev.senshost.net/api";
//const API_URL = "http://senshost.com:8015/api";
const SOCKET_URL = "mqtt://senshost.com";
//API contexts
//We will pass this to swagger class constractor if we need different base urls
//const DEFAULT = "";
//const SECONDARY = "/something";

export enum APILIST {
  LINKS = "links",
  REGISTER = "register",
  HOSTELS = "hostels",
  GET_HOSTEL = "get-hostel",
  GET_ALL_HOSTEL = "get-all-hostel",
  GET_ALL_USERS = "get-all-users"
}

//CONFIG DATA (Please change here only)
const configs = {
  delay: 500,
  dashbordRefreshRate: 1,
  port: 8015,
  appName: "senhost",
  toastDelay: 5000,
  tokenStorage: "TOKEN_PERSIST",
  socket: SOCKET_URL,
  type: TYPE_REST,

  // imageUrl: "http://localhost:8000/TieredImages/",
  // context: "http://localhost:8000/api",
  // baseRedirectFront:'http://localhost:8000/',
  // baseRedirect:'http://localhost:8000',

  imageUrl: "https://link.mygupta.co/TieredImages/",
  context: "https://link.mygupta.co/api",
  baseRedirectFront:'https://www.mygupta.co/',
  baseRedirect:'https://link.mygupta.co',


  
  // imageUrl2: "https://beternl-app-4lwxp.ondigitalocean.app/products/",
  // imageUrl: "hhttps://beternl-app-4lwxp.ondigitalocean.app/TieredImages/",
  // context: "https://beternl-app-4lwxp.ondigitalocean.app/api",
  // baseRedirectFront:'http://localhost:3000/',
  // baseRedirect:'https://beternl-app-4lwxp.ondigitalocean.app',

  history: createBrowserHistory(),
  requestTimeOut: 30000,
  apiList: APILIST,
  tablePageSize: 10,
};
export default configs;
