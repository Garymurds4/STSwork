import React from "react";
import AWS from "aws-sdk";
//import React, {useState} from 'react';
//import ClientSide from './clientSide';

export default function SessionToken() {
  //const [accessKeySTS, setAccessKeySTS] = useState();
  //const [secretKeySTS, setSecretKeySTS] = useState();
  //const [sessionSTS, setSessionSTS] = useState();

  const sts = new AWS.STS({ apiVersion: "2011-06-15" });

  const userId = 123;

  const myBucketPolicy = `{
                    "Version": "2012-10-17",
                    "Statement": [
                        {
                            "Sid": "VisualStudioCode",
                            "Effect": "Allow",
                            "Action": [
                                "s3:PutObject",
                                "s3:GetObject"
                            ],
                            "Resource": [
                                "arn:aws:s3:::gary-sts-test/${userId}/*"
                            ]
                        }
                    ]
                }`;

  const role = {
    RoleArn: "arn:aws:iam::443659653240:role/clientRoleWeb",
    Policy: myBucketPolicy,
    RoleSessionName: "clientRoleWeb",
    DurationSeconds: 3600, //1 hour
  };
  
  sts.assumeRole(role, (err, data) => {
    console.log(sts)
    console.log(data);
    if (err) {
      console.log("hello");
      console.log("Getting error: ", err.message);
      return;
    }
    console.log({
      accessKeyId: data.Credentials.AccessKeyId,
      secretAccessKey: data.Credentials.SecretAccessKey,
      sessionToken: data.Credentials.SessionToken,
    });
    //setAccessKeySTS(data.Credentials.AccessKeyId);
    //setSecretKeySTS(data.Credentials.SecretAccessKey);
    //setSessionSTS(data.Credentials.SessionToken);
  });

  return (
    <div>
      <h4>Session Token</h4>
    </div>
  );
}
// <clientSide accessKeySTS={accessKeySTS} secretKeySTS={secretKeySTS} sessionSTS={sessionSTS} />
