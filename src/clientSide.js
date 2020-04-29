import React from 'react';

export default function ClientSide({accessKeySTS, secretKeySTS, sessionSTS}){

const fs = require('fs');
const AWS = require('aws-sdk');
const body = fs.createReadStream('./helloworld.txt');

AWS.config.update({
    region:'eu-west-1',
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

<h4>Should output data to s3</h4>
);
}