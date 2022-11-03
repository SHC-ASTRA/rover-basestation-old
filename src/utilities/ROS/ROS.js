import 'roslib/build/roslib';

var ros = new ROSLIB.Ros();

ros.on('connection', () => {
    console.log('Connected to ROSBridge Server.');
});

ros.on('error', (error) => {
    console.log('Error connecting to ROSBridge Server: ', error);
});

ros.on('close', () => {
    console.log('Connection to ROSBridge Server closed.');
});

export default ros;
