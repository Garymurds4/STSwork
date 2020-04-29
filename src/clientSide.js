import React from 'react';

export default function clientSide({accessKeySTS, secretKeySTS, sessionSTS}){

const fs = require('fs');
const AWS = require('aws-sdk');
const body = fs.createReadStream('./helloworld.txt');

AWS.config.update({
    region:'us-east-1',
    accessKeyId: accessKeySTS,
    secrteAccessKey: secretKeySTS,
    sessionToken: sessionSTS,

});

const s3 = new AWS.S3();

const params = {
    Body: body,
    Bucket:'bucket-name',
    Key:'123/helloworld.txt'

}

s3.putObject(params, (err,data) =>{
    if(err){
        console.log(err.message);
    } else{
        console.log(data);
    }
});
return(
<h4>Should out put data to s3</h4>
);
}