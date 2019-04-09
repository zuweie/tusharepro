'use strict';

const http = require('http');

function pro_api (api_name, token, params, fields='') {

    return new Promise ( (reslove, reject ) => {
        
        
        const parameters = JSON.stringify({
            api_name: api_name,
            token: token,
            params: params,
            fields: fields
        });

        //console.log (parameters);

        const options = {
            hostname: 'api.tushare.pro',
            port: 80,
            path: '/',
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Content-Length' : parameters.length,
            },
        };
        
        const req = http.request(options, res => {

            if (res.statusCode != 200) {
                reject ({'code':res.statusCode, 'errmsg':res.statusMessage});
            }
            
            let data = '';

            res.setEncoding('utf8');
            res.on('data', chunk => {
                data += chunk;
            }).on('end', () => {
                //console.log(data);
                let stock_data = reformat_data(data);
                if (stock_data.code === 0) {
                    reslove (stock_data);
                }else{
                    reject (stock_data);
                }
            });
            

        } ).on('error', err => {
            reject ({'code':err.code, 'errmsg':err.message});
        });

        req.write(parameters);
        req.end();
    });
    
}

 function reformat_data (rawdata) {
     const raw_data = JSON.parse(rawdata);
     let stock_data = {
         code: raw_data.code,
         errmsg: raw_data.msg ? raw_data.msg : 'ok',
         data: null,
         fields: null,
     };
     if (raw_data.code == 0) {
        stock_data.fields = raw_data.data.fields;
        stock_data.data = [];
        const fields = stock_data.fields;
        raw_data.data.items.forEach( item => {
           let item_data = {};
           for (let i=0; i<fields.length; ++i) {
              item_data[fields[i]] = item[i];
           }
           stock_data.data.push(item_data);
        });
        
     }

     return stock_data;
 }

/**
 * @description: TusharePro 类
 * @param {type} 
 * @return: 
 */
function TusharePro (token) {

    this.token = token;

};

/**
 * @description: tushare pro api
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.pro_api = function (api_name, params, fields=''){
    return pro_api(api_name, this.token, params, fields);
};

/**
 * @description: 获取基础信息数据，包括股票代码、名称、上市日期、退市日期等
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.stock_basic = function (is_hs='', list_status='', exchange='', fields='') {
    return pro_api('stock_basic', 
        this.token,
        {
            is_hs:is_hs, 
            list_status:list_status, 
            exchange: exchange
        },
        fields);
};

/**
 * @description: 获取各大交易所交易日历数据,默认提取的是上交所
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.trade_cal = function (exchange='', start_date='', end_date='', is_open='', fields='') {
    return pro_api ('trade_cal', 
        this.token,
        {
            exchange: exchange,
            start_date: start_date,
            end_date: end_date,
            is_open: is_open,

        },
        fields);
};

/**
 * @description: 获取沪股通、深股通成分数据
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.hs_const = function (hs_type='', is_new='', fields='') {
    return pro_api ('hs_const',
        this.token,
        {
            hs_type: hs_type,
            is_new: is_new
        },
        fields);
};

/**
 * @description: 历史名称变更记录
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.name_change = function (ts_code='', start_date='', end_date='', fields='') {
    return pro_api('namechange',
        this.token,
        {
            ts_code: ts_code,
            start_date: start_date,
            end_date: end_date
        },
        fields);
};

 /**
  * @description: 获取上市公司基础信息/用户需要至少120积分才可以调取，具体请参阅积分获取办法
  * @param {type} 
  * @return: 
  */
 TusharePro.prototype.stock_company = function (exchange='', fields='') {
    return pro_api('exchange',
        this.token,
        {
            exchange: exchange,
        }, 
        fields);
 };

 /**
  * @description: 获取新股上市列表数据/单次最大2000条，总量不限制/用户需要至少120积分才可以调取，具体请参阅积分获取办法
  * @param {type} 
  * @return: 
  */
 TusharePro.prototype.new_share = function (start_date='', end_date='', fields='') {
     return pro_api('new_share',
        this.token,
        {
            start_date: start_date,
            end_date: end_date,
        },
        fields
     );
 };

 /**
  * @description: 交易日每天15点～16点之间/每分钟内最多调取200次，超过5000积分无限制/获取股票行情数据，或通过通用行情接口获取数据，包含了前后复权数据．
  * @param {type} 
  * @return: 
  */
 TusharePro.prototype.daily = function (ts_code='', start_date='', end_date='', trade_date='', symbol='', fields='') {
    return pro_api('daily',
        this.token,
        {
            ts_code:ts_code,
            trade_date: trade_date,
            start_date: start_date,
            end_date: end_date,
            symbol: symbol,
            fields: fields,
        },
        fields);
 }
module.exports = TusharePro;

