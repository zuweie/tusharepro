
const http = require('http');

exports.pro_api = function (api_name, token, params, fields = '', datafunc) {

    return new Promise((reslove, reject) => {

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
                'Content-Type': 'application/json',
                'Content-Length': parameters.length,
            },
        };

        const req = http.request(options, res => {

            if (res.statusCode != 200) {
                reject({ code: res.statusCode, errmsg: res.statusMessage });
            }

            let data = '';

            res.setEncoding('utf8');
            res.on('data', chunk => {
                data += chunk;
            }).on('end', () => {

                let raw_stock_data = JSON.parse(data);
                if (raw_stock_data.code === 0) {

                    reslove({ 
                        code:   raw_stock_data.code, 
                        errmsg: raw_stock_data.msg, 
                        data:   datafunc ? datafunc( raw_stock_data.data ) : raw_stock_data.data 
                    });

                } else {
                    reject({ code: raw_stock_data.code, errmsg: raw_stock_data.msg });
                }

            });

        })

        req.on('error', err => {
            reject({ code: err.code, errmsg: err.message });
        });

        // 发送请求。
        req.write(parameters);
        
        req.end();
    });

}