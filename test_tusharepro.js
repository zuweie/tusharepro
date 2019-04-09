'use strict';

const TusharePro = require('./tspro');

const tushare = new TusharePro('93ecc4a57a1b58051591cf77c7e960c66af95ce980628fa518130444');
/*
tushare.pro_api('daily', {ts_code: '000001.SZ', trade_date: '20190408'}, 'open,high,low,close,trade_date,ts_code')
.then(data => {
    console.log (JSON.stringify(data));
}).catch( err => {
    console.log (err);
});
*/
/*
tushare.stock_basic()
.then(data => {
    console.log (JSON.stringify(data));
}).catch (err => {
    console.log (err);
});
*/
tushare.trade_cal()
    .then(data => {
        console.log (JSON.stringify(data));
    })
    .catch( err => {
        console.log (err);
    });
//console.log (JSON.stringify(data));