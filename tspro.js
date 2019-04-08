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
                reject (res.statusMessage);
            }
            
            let data = '';

            res.setEncoding('utf8');
            res.on('data', chunk => {
                data += chunk;
            }).on('end', () => {
                //console.log(data);
                reslove (data);
            });
            

        } ).on('error', err => {
            reject (err.message);
        });

        req.write(parameters);
        req.end();
    });
    
}


function TusharePro (token) {

    this.token = token;

};

TusharePro.prototype.pro_api = async function (api_name, params, fields=''){
    try {
        var data =  await pro_api(api_name, this.token, params, fields);
    }catch(e) {
        console.log(e);
    }
    
    console.log(data);
}


module.exports = TusharePro;

