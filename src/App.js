import React, { useState } from "react";

import "./App.css";
import AWS from "aws-sdk";
import { myMSALObj } from "./Auth/MSALconfig";

function App() {
  const [cred, setCred] = useState("");
  const login = () => {
    const loginRequest = {
      scopes: ["openid", "profile", "User.Read"],
    };

    myMSALObj
      .loginPopup(loginRequest)
      .then((loginResponse) => {
        console.log(loginResponse);

        const sts = new AWS.STS({ apiVersion: "2011-06-15" });

        var params = {
          DurationSeconds: 3600,
          Policy:
            '{"Version":"2012-10-17","Statement":[{"Sid":"Stmt1","Effect":"Allow","Action":"s3:ListAllMyBuckets","Resource":"*"}]}',

          RoleArn: "arn:aws:iam::443659653240:role/BlacklineWebRole",
          RoleSessionName: "app1",
          WebIdentityToken: loginResponse.idToken.rawIdToken,
        };

        sts.assumeRoleWithWebIdentity(params, function (err, data) {
          if (err) console.log(err, err.stack);
          // an error occurred
          else {
            // successful response
            console.log(data);
            setCred(data.Credentials)
          } 
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <button onClick={login}>Login</button>
      {JSON.stringify(cred)}
    </div>
  );
}

export default App;