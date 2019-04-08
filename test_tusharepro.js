'use strict';

const TusharePro = require('./tspro');

const tushare = new TusharePro('93ecc4a57a1b58051591cf77c7e960c66af95ce980628fa518130444');

tushare.pro_api('daily', {ts_code: '000001.SZ', start_date:'20180701', end_date:'20180718'}, 'open,high,low,close,trade_date');