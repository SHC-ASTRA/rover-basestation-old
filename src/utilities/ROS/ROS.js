import React from 'react';
import { Ros } from 'roslib';

var ros = new Ros();

ros.on('connection', () => {
    console.log('Connected to ROSBridge Server.');
});

ros.on('error', (error) => {
    console.log('Error connecting to ROSBridge Server: ', error);
});

ros.on('close', () => {
    console.log('Connection to ROSBridge Server closed.');
});

export const RosContext = React.createContext(ros);
