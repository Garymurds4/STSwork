import "./App.css";
import React from "react";
import SessionToken from "./sessionToken";
import {myMSALObj} from "./Auth/MSALconfig"

function App() {
  const login=()=>{
   
    const loginRequest = {
    scopes: ["openid", "profile", "User.Read"],
};

myMSALObj.loginPopup(loginRequest)
    .then((loginResponse) => {
    console.log(loginResponse)
}).catch(function (error) {
    console.log(error);
});
  }
  return (
    <>
    <button onClick={login}>Login</button>
      <SessionToken />
    </>
  );
}

export default App;
