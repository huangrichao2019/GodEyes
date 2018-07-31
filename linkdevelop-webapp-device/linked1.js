var fs = require('fs');
var direction
const aliyunIot = require('aliyun-iot-device-sdk');
const device = aliyunIot.device({
  productKey: 'a1YHphFxZ0n',
  deviceName: 'camera0',
  deviceSecret: 'MnW8MeGDpi8VAg2PaiVqq1fkhyE3AEd',
});
device.on('connect', () => {//连接成功
  console.log('connect successfully');
  device.serve('property/set', params => {//监听云端消息
      console.log('receieve params:', params);
          var str = JSON.stringify(params);//转成json格式
          fs.writeFile('control1.json',str,function(err){//写入文件
              if(err){
                  console.error(err);
              }
              console.log('----------新增成功-------------');
          });
    console.log('post props:', params);
    device.postProps(params, err => {//原样上报
      if (err) {
        return console.log('post error:', err);
      }
      console.log('post successfully!');
    });
  });
});
device.on('error', (err) =>{//连接失败
  console.log('error', err);
});