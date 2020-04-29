import React, { useState } from "react";
import ClientSide from "./clientSide";

export default function SessionToken(props) {
  const [accessKeySTS, setAccessKeySTS] = useState();
  const [secretKeySTS, setSecretKeySTS] = useState();
  const [sessionSTS, setSessionSTS] = useState();
  var AWS = require("aws-sdk");
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
                                "arn:aws:s3:::XXXXXXXXXX/${userId}/*"
                            ]
                        }
                    ]
                }`;

  const role = {
    RoleArn: "arn:aws:iam::XXXXXXXXXX:role/webClientRole",
    Policy: myBucketPolicy,
    RoleSessionName: "webClientRole",
    DurationSeconds: 3600, //1 hour
  };

  sts.assumeRole(role, (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log({
      accessKeyId: data.Credentials.AccessKeyId,
      secretAccessKey: data.Credentials.SecretAccessKey,
      sessionToken: data.Credentials.SessionToken,
    });
    setAccessKeySTS(data.Credentials.AccessKeyId);
    setSecretKeySTS(data.Credentials.SecretAccessKey);
    setSessionSTS(data.Credentials.SessionToken);
  });

  return (
    <ClientSide
      accessKeySTS={accessKeySTS}
      secretKeySTS={secretKeySTS}
      sessionSTS={sessionSTS}
    />
  );
}
