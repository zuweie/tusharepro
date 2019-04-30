'use strict';

const http = require('http');

/**
 * @description: TusharePro 类, 传入您在TusharePro申请的Token, 
 * @params datafunc: 用于处理api返回的数据，置空则不做处理，原始返回。
 * @return: 
 */
function TusharePro(token) {

    this.token = token;
    this.datafunc = null;
};

/**
 * @description: 设置处理 data 的函数
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.set_datafunc = function (datafunc) {
    this.datafunc = datafunc;
    return this;
}
/**
 * @description: tushare pro api
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.pro_api = function (api_name, params, fields = '') {
    var pro_api = require('./proapi').pro_api;
    return pro_api(api_name, this.token, params, fields, this.datafunc);
};

/**
 * @description: 获取基础信息数据，包括股票代码、名称、上市日期、退市日期等
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.stock_basic = function (is_hs = '', list_status = '', exchange = '', fields = '') {
    return this.pro_api('stock_basic',
        {
            is_hs: is_hs,
            list_status: list_status,
            exchange: exchange
        },
        fields
    );
};

/**
 * @description: 获取各大交易所交易日历数据,默认提取的是上交所
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.trade_cal = function (exchange = '', start_date = '', end_date = '', is_open = '', fields = '') {
    return this.pro_api('trade_cal',
        {
            exchange: exchange,
            start_date: start_date,
            end_date: end_date,
            is_open: is_open,

        },
        fields
    );
};

/**
 * @description: 获取沪股通、深股通成分数据
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.hs_const = function (hs_type, is_new = '', fields = '') {
    return this.pro_api('hs_const',
        {
            hs_type: hs_type,
            is_new: is_new
        },
        fields
    );
};

/**
 * @description: 历史名称变更记录
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.name_change = function (ts_code = '', start_date = '', end_date = '', fields = '') {
    return this.pro_api('namechange',
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
TusharePro.prototype.stock_company = function (exchange = '', fields = '') {
    return this.pro_api('stock_company',
        {
            exchange: exchange,
        },
        fields
    );
};

/**
 * @description: 获取新股上市列表数据/单次最大2000条，总量不限制/用户需要至少120积分才可以调取，具体请参阅积分获取办法
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.new_share = function (start_date = '', end_date = '', fields = '') {
    return this.pro_api('new_share',
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
TusharePro.prototype.daily = function (ts_code = '', trade_date = '', start_date = '', end_date = '', symbol = '', fields = '') {
    return this.pro_api('daily',
        {
            ts_code: ts_code,
            trade_date: trade_date,
            start_date: start_date,
            end_date: end_date,
            symbol: symbol,
            fields: fields,
        },
        fields
    );
};

/**
 * @description: 获取A股周线行情/单次最大3700，总量不限制/用户需要至少300积分才可以调取，具体请参阅积分获取办法
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.weekly = function (ts_code = '', trade_date = '', start_date = '', end_date = '', fields = '') {
    return this.pro_api('weekly',
        {
            ts_code: ts_code,
            trade_date: trade_date,
            start_date: start_date,
            end_date: end_date
        },
        fields
    );
};

/**
 * @description: 获取A股月线数据/单次最大3700，总量不限制/用户需要至少300积分才可以调取，具体请参阅积分获取办法
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.monthly = function (ts_code = '', trade_date = '', start_date = '', end_date = '', fields = '') {
    return this.pro_api('monthly',
        {
            ts_code: ts_code,
            trade_date: trade_date,
            start_date: start_date,
            end_date,
        },
        fields
    );
};



/**
 * @description: 复权行情通过通用行情接口实现，利用Tushare Pro提供的复权因子进行计算，目前暂时只在SDK中提供支持，http方式无法调取。
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.pro_bar = function (fields = '') {


    return new Promise((reslove, reject) => {

        reject({
            code: 'NOSUPPORT',
            errmsg: '复权行情通过通用行情接口实现，利用Tushare Pro提供的复权因子进行计算，目前暂时只在SDK中提供支持，http方式无法调取。详情：https://tushare.pro/document/2?doc_id=146'
        });

    });

};

/**
 * @description: 获取股票每日停复牌信息
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.suspend = function (ts_code = '', suspend_date = '', resume_date = '', fields = '') {
    return this.pro_api('suspend',
        {
            ts_code: ts_code,
            suspend_date: suspend_date,
            resume_date: resume_date
        },
        fields
    );
};

/**
 * @description: 获取全部股票每日重要的基本面指标，可用于选股分析、报表展示等./用户需要至少300积分才可以调取，具体请参阅积分获取办法
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.daily_basic = function (ts_code = '', trade_date = '', start_date = '', end_date = '', fields = '') {
    return this.pro_api('daily_basic',
        {
            ts_code: ts_code,
            trade_date: trade_date,
            start_date: start_date,
            end_date: end_date
        },
        fields
    );
};

/**
 * @description: 获取股票复权因子，可提取单只股票全部历史复权因子，也可以提取单日全部股票的复权因子。
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.adj_factor = function (ts_code, trade_date = '', start_date = '', end_date = '', fields = '') {
    return this.pro_api('adj_factor',
        {
            ts_code: ts_code,
            trade_date: trade_date,
            start_date: start_date,
            end_date: end_date
        },
        fields
    );
}

/**
 * @description: 获取沪深A股票资金流向数据，分析大单小单成交情况，用于判别资金动向/单次最大提取4000行记录，总量不限制/用户需要至少1500积分才可以调取，基础积分有流量控制，积分越多权限越大，请自行提高积分，具体请参阅积分获取办法
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.moneyflow = function (ts_code = '', trade_date = '', start_date = '', end_date = '', fields = '') {
    return this.pro_api('moneyflow',
        {
            ts_code: ts_code,
            trade_date: trade_date,
            start_date: start_date,
            end_date: end_date
        },
        fields
    );
};

/**
 * @description: 获取上市公司财务利润表数据/用户需要至少500积分才可以调取，具体请参阅积分获取办法
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.income = function (ts_code, ann_date = '', start_date = '', end_date = '', period = '', report_type = '', comp_type = '', fields = '') {
    return this.pro_api('income',
        {
            ts_code: ts_code,
            ann_date: ann_date,
            start_date: start_date,
            end_date: end_date,
            period: period,
            report_type: report_type,
            comp_type: comp_type
        },
        fields
    );
};

/**
 * @description: 获取上市公司资产负债表/用户需要至少500积分才可以调取，具体请参阅积分获取办法
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.balancesheet = function (ts_code, ann_date = '', start_date = '', end_date = '', period = '', report_type = '', comp_type = '', fields = '') {
    return this.pro_api('balancesheet',
        {
            ts_code: ts_code,
            ann_date: ann_date,
            start_date: start_date,
            end_date: end_date,
            period: period,
            report_type: report_type,
            comp_type: comp_type
        },
        fields
    );
};

/**
 * @description: 获取上市公司现金流量表/用户需要至少500积分才可以调取，具体请参阅积分获取办法
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.cashflow = function (ts_code, ann_date = '', start_date = '', end_date = '', period = '', report_type = '', comp_type = '', fields = '') {
    return this.pro_api('cashflow',
        {
            ts_code: ts_code,
            ann_date: ann_date,
            start_date: start_date,
            end_date: end_date,
            period: period,
            report_type: report_type,
            comp_type: comp_type
        },
        fields
    );
};

/**
 * @description: 获取业绩预告数据/用户需要至少600积分才可以调取，具体请参阅积分获取办法
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.forecast = function (ts_code = '', ann_date = '', start_date = '', end_date = '', period = '', type = '', fields = '') {
    return this.pro_api('forecast',
        {
            ts_code: ts_code,
            ann_date: ann_date,
            start_date: start_date,
            end_date: end_date,
            period: period,
            type: type,
        },
        fields
    );
};

/**
 * @description: 获取上市公司业绩快报/用户需要至少500积分才可以调取，具体请参阅积分获取办法
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.express = function (ts_code, ann_date = '', start_date = '', end_date = '', period = '', fields = '') {
    return this.pro_api('express',
        {
            ts_code: ts_code,
            ann_date: ann_date,
            start_date: start_date,
            end_date: end_date,
            period: period
        },
        fields
    );
};

/**
 * @description: 分红送股数据/用户需要至少300积分才可以调取，具体请参阅积分获取办法
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.dividend = function (ts_code = '', ann_date = '', record_date = '', ex_date = '', imp_ann_date = '', fields = '') {
    return this.pro_api('dividend',
        {
            ts_code: ts_code,
            ann_date: ann_date,
            record_date: record_date,
            ex_date: ex_date,
            imp_ann_date: imp_ann_date
        },
        fields
    );
};

/**
 * @description: 获取上市公司财务指标数据，为避免服务器压力，现阶段每次请求最多返回60条记录，可通过设置日期多次请求获取更多数据/用户需要至少500积分才可以调取，具体请参阅积分获取办法
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.fina_indicator = function (ts_code, ann_date = '', start_date = '', end_date = '', period = '', fields = '') {
    return this.pro_api('fina_indicator',
        {
            ts_code: ts_code,
            ann_date: ann_date,
            start_date: start_date,
            end_date: end_date,
            period: period
        },
        fields
    );
};

/**
 * @description: 获取上市公司定期财务审计意见数据/用户需要至少500积分才可以调取，具体请参阅积分获取办法
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.fina_audit = function (ts_code, ann_date = '', start_date = '', end_date = '', period = '', fields = '') {
    return this.pro_api('final_audit',
        {
            ts_code: ts_code,
            ann_date: ann_date,
            start_date: start_date,
            end_date: end_date,
            period: period,
        },
        fields
    );
};

/**
 * @description: 获得上市公司主营业务构成，分地区和产品两种方式/用户需要至少500积分才可以调取，具体请参阅积分获取办法
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.fina_mainbz = function (ts_code, period = '', type = '', start_date = '', end_date = '', fields = '') {
    return this.pro_api('final_mainbz',
        {
            ts_code: ts_code,
            period: period,
            type: type,
            start_date: start_date,
            end_date
        },
        fields
    );
};

/**
 * @description: 获取财报披露计划日期/单次最大3000，总量不限制/用户需要至少500积分才可以调取，积分越多权限越大，具体请参阅积分获取办法
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.disclosure_date = function (ts_code = '', end_date = '', pre_date = '', actual_date = '', fields = '') {
    return this.pro_api('disclosure_date',
        {
            ts_code: ts_code,
            end_date: end_date,
            pre_date: pre_date,
            actual_date: actual_date,
        },
        fields,
    );
};

/**
 * @description: 获取沪股通、深股通、港股通每日资金流向数据，每次最多返回300条记录，总量不限制。
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.moneyflow_hsgt = function (trade_date = '', start_date = '', end_date = '', fields = '') {
    return this.pro_api('moneyflow_hsgt',
        {
            trade_date: trade_date,
            start_date: start_date,
            end_date: end_date
        },
        fields
    );
};

/**
 * @description: 获取沪股通、深股通每日前十大成交详细数据
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.hsgt_top10 = function (ts_code = '', trade_date = '', start_date = '', end_date = '', market_type = '', fields = '') {
    return this.pro_api('hsgt_top10',
        {
            ts_code: ts_code,
            trade_date: trade_date,
            start_date: start_date,
            end_date: end_date,
            market_type: market_type,
        },
        fields
    );
};

/**
 * @description: 获取港股通每日成交数据，其中包括沪市、深市详细数据
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.ggt_top10 = function (ts_code = '', trade_date = '', start_date = '', end_date = '', market_type = '', fields = '') {
    return this.pro_api('ggt_top10',
        {
            ts_code: ts_code,
            trade_date: trade_date,
            start_date: start_date,
            end_date: end_date,
            market_type
        },
        fields
    );
};

/**
 * @description: 获取融资融券每日交易汇总数据
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.margin = function (trade_date, exchange_id = '', fields = '') {
    return this.pro_api('margin',
        {
            trade_date: trade_date,
            exchange_id: exchange_id
        },
        fields
    );
};

/**
 * @description: 获取沪深两市每日融资融券明细
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.margin_detail = function (trade_date, ts_code = '', fields = '') {
    return this.pro_api('margin_detail',
        {
            trade_date: trade_date,
            ts_code: ts_code
        },
        fields
    );
};

/**
 * @description: 获取上市公司前十大股东数据，包括持有数量和比例等信息
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.top10_holders = function (ts_code, period = '', ann_date = '', start_date = '', end_date = '', fields = '') {
    return this.pro_api('top10_holder',
        {
            ts_code: ts_code,
            period: period,
            ann_date: ann_date,
            start_date: start_date,
            end_date: end_date
        },
        fields
    );
};

/**
 * @description: 获取上市公司前十大流通股东数据
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.top10_floatholders = function (ts_code, period = '', ann_date = '', start_date = '', end_date = '', fields = '') {
    return this.pro_api('top10_floatholders',
        {
            ts_code: ts_code,
            period: period,
            ann_date: ann_date,
            start_date: start_date,
            end_date: end_date
        },
        fields
    );
};

/**
 * @description: 龙虎榜每日交易明细/2005年至今/单次最大10000/用户需要至少300积分才可以调取，具体请参阅积分获取办法
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.top_list = function (trade_date, ts_code = '', fields = '') {
    return this.pro_api('top_list',
        {
            trade_date: trade_date,
            ts_code: ts_code
        },
        fields
    );
};

/**
 * @description: 龙虎榜机构成交明细/单次最大10000/单次最大10000
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.top_inst = function (trade_date, ts_code = '', fields = '') {
    return this.pro_api('top_inst',
        {
            trade_date: trade_date,
            ts_code: ts_code
        },
        fields
    );
};

/**
 * @description: 获取股权质押统计数据/单次最大1000/用户需要至少300积分才可以调取，具体请参阅积分获取办法
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.pledge_stat = function (ts_code, fields = '') {
    return this.pro_api('pledge_stat',
        {
            ts_code: ts_code
        },
        fields
    )
};


/**
 * @description: 获取股权质押明细数据/单次最大1000/用户需要至少300积分才可以调取，具体请参阅积分获取办法
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.pledge_detail = function (ts_code, fields = '') {
    return this.pro_api('pledge_detail',
        {
            ts_code: ts_code
        },
        fields
    );
};

/**
 * @description: 获取上市公司回购股票数据/用户需要至少600积分才可以调取，具体请参阅积分获取办法
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.repurchase = function (ann_date = '', start_date = '', end_date = '', fields = '') {
    return this.pro_api('repurchase',
        {
            ann_date: ann_date,
            start_date: start_date,
            end_date: end_date
        },
        fields
    );
};

/**
 * @description: 获取概念股分类，目前只有ts一个来源，未来将逐步增加来源/用户需要至少300积分才可以调取，具体请参阅积分获取办法
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.concept = function (src = '', fields = '') {
    return pro_api('concept',
        {
            src: src
        },
        fields
    );
};

/**
 * @description: 获取概念股分类明细数据/概念分类ID （id来自概念股分类接口）/用户需要至少300积分才可以调取，具体请参阅积分获取办法
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.concept_detail = function (id, fields = '') {
    return this.pro_api('concept_detail',
        {
            id: id,
        },
        fields
    );
};

/**
 * @description: 获取限售股解禁/单次最大5000条，总量不限制/120分可调取，每分钟内限制次数，超过5000积分无限制，具体请参阅积分获取办法
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.share_float = function (ts_code = '', ann_date = '', float_date = '', start_date = '', end_date = '', fields = '') {
    return this.pro_api('share_float',
        {
            ts_code: ts_code,
            ann_date: ann_date,
            float_date: float_date,
            start_date: start_date,
            end_date: end_date,
        },
        fields
    );
}

/**
 * @description: 大宗交易/单次最大1000条，总量不限制/300积分可调取，每分钟内限制次数，超过5000积分无限制，具体请参阅积分获取办法
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.block_trade = function (ts_code = '', trade_date = '', start_date = '', end_date = '', fields = '') {
    return this.pro_api('block_trade',
        {
            ts_code: ts_code,
            trade_date: trade_date,
            start_date: start_date,
            end_date: end_date,
        },
        fields
    );
};

/**
 * @description: 获取股票账户开户数据，统计周期为一周/600积分可调取，具体请参阅积分获取办法
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.stk_account = function (date = '', start_date = '', end_date = '', fields = '') {
    return this.pro_api('stk_account',
        {
            date: date,
            start_date: start_date,
            end_date: end_date,
        },
        fields
    );
};

/**
 * @description: 获取上市公司股东户数数据，数据不定期公布/单次最大3000,总量不限制/600积分可调取，基础积分每分钟调取100次，5000积分以上无限制。具体请参阅积分获取办法
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.stk_holdernumber = function (ts_code = '', enddate = '', start_date = '', end_date = '', fields = '') {
    return this.pro_api('stk_holdernumber',
        {
            ts_code: ts_code,
            enddate: enddate,
            start_date: start_date,
            end_date: end_date,
        },
        fields
    );
}

/**
 * @description: 获取指数基础信息
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.index_basic = function (market, publisher = '', category = '', fields = '') {
    return this.pro_api('index_basic',
        {
            market: market,
            publisher: publisher,
            category: category,
        },
        fields
    );
};

/**
 * @description: 获取指数每日行情，还可以通过bar接口获取。由于服务器压力，目前规则是单次调取最多取8000行记录，可以设置start和end日期补全。指数行情也可以通过通用行情接口获取数据．/ 用户需要累积200积分才可以调取，具体请参阅积分获取办法
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.index_daily = function (ts_code, trade_date = '', start_date = '', end_date = '', fields = '') {
    return this.pro_api('index_daily',
        {
            ts_code: ts_code,
            trade_date: trade_date,
            start_date: start_date,
            end_date: end_date
        },
        fields
    );
};

/**
 * @description: 获取指数周线行情/单次最大1000行记录，可分批获取，总量不限制/用户需要至少600积分才可以调取，积分越多频次越高，具体请参阅积分获取办法
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.index_weekly = function (ts_code = '', trade_date = '', start_date = '', end_date = '', fields = '') {
    return this.pro_api('index_weekly',
        {
            ts_code: ts_code,
            trade_date: trade_date,
            start_date: start_date,
            end_date: end_date
        },
        fields
    );
};

/**
 * @description: 获取指数月线行情,每月更新一次/单次最大1000行记录,可多次获取,总量不限制/用户需要至少600积分才可以调取，积分越多频次越高，具体请参阅积分获取办法
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.index_monthly = function (ts_code = '', trade_date = '', start_date = '', end_date = '', fields = '') {
    return this.pro_api('index_monthly',
        {
            ts_code: ts_code,
            trade_date: trade_date,
            start_date: start_date,
            end_date,
        },
        fields
    );
};

/**
 * @description: 获取各类指数成分和权重，月度数据 ，如需日度指数成分和权重，请联系 waditu@163.com/指数公司网站公开数据/用户需要至少400积分才可以调取，具体请参阅积分获取办法
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.index_weight = function (index_code, trade_date, start_date = '', end_date = '', fields = '') {
    return this.pro_api('index_weight',
        {
            index_code: index_code,
            trade_date: trade_date,
            start_date: start_date,
            end_date: end_date
        },
        fields
    );
};

/**
 * @description: 目前只提供上证综指，深证成指，上证50，中证500，中小板指，创业板指的每日指标数据/Tushare社区统计计算/从2004年1月开始提供/用户需要至少400积分才可以调取，具体请参阅积分获取办法
 * @param {type} 
 * @return: 
 */
TusharePro.prototype.index_dailybasic = function (trade_date = '', ts_code = '', start_date = '', end_date = '', fields = '') {
    return this.pro_api('index_dailybasic',
        {
            trade_date: trade_date,
            ts_code: ts_code,
            start_date: start_date,
            end_date: end_date,
        },
        fields
    );
};

module.exports = TusharePro;

