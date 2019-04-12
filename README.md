# Tushare Pro JS
### 项目介绍
* [Tushare Pro](https://tushare.pro/document/2) 是啥？自行百度，不啰嗦了！
* 此项目是对Tushare Pro 的 Http 接口的封装，使用的Javascript。

### 安装
npm i tusharepro

### 使用
```
const Tushare = require('tusharepro');
var ts = new Tushare('you-tusharepro-token');

/* 在获得数据后，可以设置数据加工函数，方便把数据加工入库。如果没有设置，则返回原始数据
  ts.set_datafunc ( function (data) {
    // doing reformat data ....
    return data;
  } );
*/

// Promise
ts.daily('000001.SZ')
.then( data => {
  console.log( data );
})
.catch (err => {
  console.log( err );
});

// async

! async function () {
  
  let data = await ts.daily('000001.SZ');
  
  console.log (data);
  
} ();
``` 
### 接口说明
* [Tushare Pro](https://tushare.pro/document/2)
* pro_bar 接口不支持 Http，无法封装，[详情](https://tushare.pro/document/2?doc_id=109)
* 接口只做到指数，那一部分，往后的接口，例如基金将来补上。

! async function () {值
! async function () {
