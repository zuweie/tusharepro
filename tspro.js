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
         data: null
     };
     if (raw_data.code == 0) {
        stock_data.data = [];
        const fields = raw_data.data.fields;
        raw_data.data.items.forEach( item => {
           let item_data = {};
           for (let i=0; i<fields.length; ++i) {
              item_data[fields[i]] = item[i];
           }
           stock_data.data.push(item_data);
        });
        stock_data.fields = fields;
     }

     return stock_data;
 }

function TusharePro (token) {

    this.token = token;

};

TusharePro.prototype.pro_api = function (api_name, params, fields=''){
    return pro_api(api_name, this.token, params, fields);
};

TusharePro.prototype.stock_basic = function (is_hs='', list_status='L', exchange='', fields='') {
    return pro_api('stock_basic', 
        this.token,
        {
            is_hs:is_hs, 
            list_status:list_status, 
            exchange: exchange
        },
        fields);
};

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
}



module.exports = TusharePro;

