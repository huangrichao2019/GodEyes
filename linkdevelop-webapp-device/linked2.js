var fs = require('fs');
var direction
const aliyunIot = require('aliyun-iot-device-sdk');
const device = aliyunIot.device({
    productKey: 'a1YHphFxZ0n',
    deviceName: 'camera1',
    deviceSecret: 'v6q7OkP5wNGpX1jobBkKXh5lMW5Vz2zN',
});
device.on('connect', () => {// 连接成功
    console.log('connect successfully');
    device.serve('property/set', params => {// 监听云端消息
        console.log('receieve params:', params);
        var str = JSON.stringify(params);//转成json格式
        fs.writeFile('control2.json',str,function(err){//写入json
            if(err){
                console.error(err);
            }
            console.log('----------新增成功-------------');
        });
        console.log('post props:', params);
        device.postProps(params, err => {// 原样上报
            if (err) {
                return console.log('post error:', err);
            }
            console.log('post successfully!');
        });
    });
});
device.on('error', (err) =>{//链接失败
    console.log('error', err);
});