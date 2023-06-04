import ROSLIB from 'roslib';
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

export const rosNode = { //OBject to hold all of the lisnteners when its time to listen

    gps_sub : new ROSLIB.Topic({
        ros: ros,
        name: '/teensy/gps',
        messageType: 'embedded_controller_relay/NavSatReport',
    }),
    
    performance_sub: new ROSLIB.Topic({
    ros: ros,
    name: '/jetson/performance_report',
    messageType: 'jetson_performance_reporter/PerformanceReport',
    }),

    battery_sub: new ROSLIB.Topic({
    ros: ros,
    name: '/teensy/battery_status',
    messageType: 'embedded_controller_relay/BatteryReport',
    }),

    rosout_sub: new ROSLIB.Topic({
        ros: ros,
        name: '/rosout',
        messageType: 'rosgraph_msgs/Log'
      }),
    
    nav_status_sub: new ROSLIB.Topic({
        ros: ros,
        name: '/navigation_status',
        messageType: 'std_msgs/String'
    }),

    human_control_pub:new ROSLIB.Topic({
        ros: ros,
        name: '/control_input',
        messageType: 'control_input_aggregator/ControlInput',
      }),

    nav_command_pub: new ROSLIB.Topic({
        ros: ros,
        name: '/navigation_command',
        messageType: 'navigation_controller/NavigationCommand'
    }),

    nav_gps_pub: new ROSLIB.Topic({
        ros: ros,
        name: '/nav_goal_gps',
        messageType: 'sensor_msgs/NavSatFix'
      }),

    bio_sub: new ROSLIB.Topic({
        ros: ros,
        name: '/bio/status',
        messageType: 'std_msgs/String'
    }),

    cmd_client: new ROSLIB.Service({
        ros: ros,
        name: '/bio/bio_command',
        serviceType: '/bio_relay/BioCommand'
      }),
    

    motor_power_pub: new ROSLIB.Topic({
        ros: ros,
        name: "/teensy/motor/max_power",
        messageType: "std_msgs/Float32"
    }),

    fr_motor_pub: new ROSLIB.Topic({
        ros: ros,
        name: "/teensy/motor/front_right/power",
        messageType: "std_msgs/Float32",
        queue_size: 1
    }),

    fl_motor_pub: new ROSLIB.Topic({
        ros: ros,
        name: "/teensy/motor/front_left/power",
        messageType: "std_msgs/Float32",
        queue_size: 1
    }),

    br_motor_pub:new ROSLIB.Topic({
        ros: ros,
        name: "/teensy/motor/back_right/power",
        messageType: "std_msgs/Float32",
        queue_size: 1
    }),

    bl_motor_pub: new ROSLIB.Topic({
        ros: ros,
        name: "/teensy/motor/back_left/power",
        messageType: "std_msgs/Float32",
        queue_size: 1
    }),

    imu_sub: new ROSLIB.Topic({
        ros: ros,
        name: "/sensor/zed2/zed_node/imu/data_drop",
        messageType: "sensor_msgs/Imu"
    }),
   
    ab_status_sub : new ROSLIB.Topic({
        ros: ros,
        name: '/arm/ab_status',
        messageType: 'arm_relay/ABStatus',
    }),


    lidar_sub : new ROSLIB.Topic({
        ros: ros,
        name: '/scan',
        messageType: 'std_msgs/String'
    }),

    aruco_pub: new ROSLIB.Topic({
        ros:ros,
        name:'/arucoToggle',
        messageType: 'std_msgs/Bool'
    }),
    
    goal_reached_sub: new ROSLIB.Topic({
        ros:ros,
        name:'/goal_reached',
        messageType: 'std_msgs/String'
    }),

    aruco_nav_tol_sub: new ROSLIB.Topic({
        ros:ros,
        name: '/nav_tol',
        messageType: 'std_msgs/int16'
    })
    };

    
export function send_cmd(cmd){
    
    var request = new ROSLIB.ServiceRequest({
        command: cmd
    }); 
    rosNode.cmd_client.callService(request);
}

export default ros;
