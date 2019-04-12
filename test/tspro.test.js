'use strict';

const expect = require ('chai').expect;

const TusharePro = require('../tspro');
const datafunc = require('../formatdata').format_data;

const token = '93ecc4a57a1b58051591cf77c7e960c66af95ce980628fa518130444';
const tsp = new TusharePro(token);
tsp.set_datafunc (datafunc);



 describe ('Tushare Pro - 基础数据 Api 测试', function () {
    it ('stock_basic', async function () {
        let result = await tsp.stock_basic();
        expect(result.code).to.be.equal(0);
    }).timeout(5000);

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
    })
})


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

     it ('pro_bar', async function () {
         let result = await tsp.pro_bar();
         expect(result.code).to.be.equal(0);
     });

     it ('suspend', async function () {
         let result = await tsp.suspend('000001.SH');
         expect(result.code).to.be.equal(0);
     });

     it ('adj_factor', async function () {
         let result = await tsp.adj_factor('000001.SZ');
         expect (result.code).to.be.equal(0);
     });

     it ('moneyflow', async function () {
         let result = await tsp.moneyflow('000779.SZ', '20190315');
         expect (result.code).to.be.equal(0);
     });
 });

 describe ('Tushare Pro - 财务数据 Api 测试', function () {
    it ('income', async function () {
        let result = await tsp.income('000779.SZ');
        expect (result.code).to.be.equal(0);
    });

    it ('balancesheet', async function () {
       let result = await tsp.balancesheet('000779.SZ');
       expect (result.code).to.be.equal(0);
    });

    it ('cashflow', async function () {
        let result = await tsp.cashflow('000779.SZ');
        expect(result.code).to.be.equal(0);
    });

    it ('forecast', async function () {
        let result = await tsp.forecast('000779.SZ');
        expect(result.code).to.be.equal(0);
    });

    it ('express', async function () {
        let result = await tsp.express('000779.SZ');
        expect(result.code).to.be.equal(0);
    });

    it ('dividend', async function () {
        let result = await tsp.dividend('000779.SZ');
        expect(result.code).to.be.equal(0);
    });

    it ('fina_indicator', async function () {
        let result = await tsp.fina_indicator('000779.SZ');
        expect(result.code).to.be.equal(0);
    });

    it ('fina_audit', async function () {
        let result = await tsp.fina_audit('000779.SZ');
        expect(result.code).to.be.equal(0);
    });

    it ('fina_mainbz', async function () {
        let result = await tsp.fina_mainbz('000779.SZ');
        expect(result.code).to.be.equal(0);
    });

    it ('disclosure_date', async function () {
        let result = await tsp.disclosure_date('000779.SZ');
        expect(result.code).to.be.equal(0);
    });
 });

 describe ('Tushare Pro - 市场参考数据 Api 测试', function () {
    it ('moneyflow_hsgt', async function () {
        let result = await tsp.moneyflow_hsgt('20180725');
        expect(result.code).to.be.equal(0);
    });

    it ('hsgt_top10', async function () {
        let result = await tsp.hsgt_top10('20180725');
        expect(result.code).to.be.equal(0);
    });

    it ('ggt_top10', async function () {
        let result = await tsp.ggt_top10('20180725');
        expect(result.code).to.be.equal(0);
    });

    it ('margin', async function () {
        let result = await tsp.margin('20180725');
        expect(result.code).to.be.equal(0);
    });

    it ('margin_detail', async function () {
        let result = await tsp.margin_detail('20180725');
        expect(result.code).to.be.equal(0);
    });

    it ('top10_holders', async function () {
        let result = await tsp.top10_holders('000779.SZ');
        expect(result.code).to.be.equal(0);
    });

    it ('top10_floatholders', async function () {
        let result = await tsp.top10_floatholders('000779.SZ');
        expect(result.code).to.be.equal(0);
    });

    it ('top_list', async function () {
        let result = await tsp.top_list('20180725');
        expect(result.code).to.be.equal(0);
    });

    it ('top_inst', async function () {
        let result = await tsp.top_inst('20180725');
        expect(result.code).to.be.equal(0);
    });

    it ('pledge_stat', async function () {
        let result = await tsp.pledge_stat('000779.SZ');
        expect(result.code).to.be.equal(0);
    });

    it ('pledge_detail', async function () {
        let result = await tsp.pledge_detail('000779.SZ');
        expect(result.code).to.be.equal(0);
    });

    it ('repurchase', async function () {
        let result = await tsp.repurchase();
        expect(result.code).to.be.equal(0);
    });

    it ('concept', async function () {
        let result = await tsp.concept('ts');
        expect(result.code).to.be.equal(0);
    });

    it ('concept_detail', async function () {
        let result = await tsp.concept_detail('TS2');
        expect(result.code).to.be.equal(0);
    });

    it ('share_float', async function () {
        let result = await tsp.share_float();
        expect(result.code).to.be.equal(0);
    });

    it ('block_trade', async function () {
        let result = await tsp.block_trade();
        expect(result.code).to.be.equal(0);
    });

    it ('stk_account', async function () {
        let result = await tsp.stk_account();
        expect(result.code).to.be.equal(0);
    });

    it ('stk_holdernumber', async function () {
        let result = await tsp.stk_holdernumber();
        expect(result.code).to.be.equal(0);
    });

 });

 describe ('Tushare Pro - 指数 Api 测试', function (){

    it ('index_basic', async function () {
        let result = await tsp.index_basic('SSE');
        expect(result.code).to.be.equal(0);
    });

    it ('index_daily', async function () {
        let result = await tsp.index_daily('000779.SZ');
        expect(result.code).to.be.equal(0);
    });

    it ('index_weekly', async function () {
        let result = await tsp.index_weekly('000779.SZ');
        expect(result.code).to.be.equal(0);
    });

    it ('index_monthly', async function () {
        let result = await tsp.index_monthly('000779.SZ');
        expect(result.code).to.be.equal(0);
    });

    it ('index_weight', async function () {
        let result = await tsp.index_weight('399300.SZ', '20180901');
        expect(result.code).to.be.equal(0);
    });
    
 });
 