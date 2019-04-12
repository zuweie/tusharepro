/**
 * @description: 处理 TusharePro 返回的原始数据。返回的结果必须包含如下格式
 * @param rawdata TusharePro Api 返回的原始数据
 * @return: {code:xx, errmsg:xxx, data:[]}
 */
exports.format_data = function (raw_data) {
    
    data = {count: raw_data.items.length, fields: raw_data.fields,  data: []};

    raw_data.items.forEach(item => {
        let item_data = {};
        for (let i = 0; i < data.fields.length; ++i) {
            item_data[data.fields[i]] = item[i];
        }
        data.data.push(item_data);
    });
    return data;
};


