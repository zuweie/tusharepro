'use strict';

const TusharePro = require('../tspro');
const expect = require ('chai').expect;
const token = '93ecc4a57a1b58051591cf77c7e960c66af95ce980628fa518130444';
const tsp = new TusharePro(token);

 describe ('Tushare Pro - 基础数据 Api 测试', function () {
     it ('stock_basic', async function () {
        let result = await tsp.stock_basic();
        expect(result.code).to.be.equal(0);
     });

     it ('trade_cal', async function () {
        let result = await tsp.trade_cal();
        expect(result.code).to.be.equal(0);
    });

     it ('hs_const', async function () {
         let result = await tsp.hs_const('SH');
         expect(result.code).to.be.equal(0);
     });

     it ('name_change', async function () {
         let result = await tsp.name_change();
         expect(result.code).to.be.equal(0);
     });

     it ('stock_company', async function () {
         let result = await tsp.stock_company();
         expect(result.code).to.be.equal(0);
     });

     it ('new_share', async function () {
         let result = await tsp.new_share();
         expect(result.code).to.be.equal(0);
     });
 });

 describe ('Tushare Pro - 行情数据 Api 测试', function () {
     it ('daily', async function () {
        let result = await tsp.daily('000001.SH', '20190410');
        expect(result.code).to.be.equal(0);
     });

     it ('weekly', async function () {
         let result = await tsp.weekly('000001.SH');
         expect(result.code).to.be.equal(0);
     });

     it ('monthly', async function () {
         let result = await tsp.monthly('000001.SH');
         expect(result.code).to.be.equal(0);
     });

     it ('')
 });