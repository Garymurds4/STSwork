 
  import * as Msal from 'msal';
  // Config object to be passed to Msal on creation
   const msalConfig = {
    auth: {
      clientId: "0ab84c67-0f9f-4248-a1b8-a9ef77c2d464", // this is a fake id
      authority: "https://login.microsoftonline.com/al.co.za",
      redirectUri: "http://localhost:3000/",
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };  

export const myMSALObj = new Msal.UserAgentApplication(msalConfig);