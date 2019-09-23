import FilterMethods from "@/assets/commonJS/FilterMethods";
import axios from 'axios';
export default {
    // 基础数据

    // 监测站点
    Base_MonitoringSites(tableType, body, filter, callBack) {
        var tableName;

        // 根据不同类型的表，选择数据库中对应的表名
        switch (tableType) {
            case "basic":
                tableName = "ST_STBPRP_B";
                break;
            case "MonitoringType":
                tableName = "ST_STBPRP_F";
                break;
            case "RelatedElements":
                tableName = "ST_STINFO_WRP";
                break;
            case "Z_Q_relation":
                tableName = "ST_ZQRL_B";
                break;
            case "Gate_Z_Q_relation":
                tableName = "ST_G_Q_Z";
                break;
        }

        axios.get(`/guanqu/admin/${tableName}`, {
            params: body
        })
            .then(res => {

                var data = res.data.rows; // 数据
                var total = res.data.total; // 数据总条数

                // 过滤
                if (typeof filter == "function") { // 如果传入的filte为过滤方法
                    data = filter(data, total);
                } else if (typeof filter == "boolean" && filter) { // 如果传入的filter为布尔值，并且为真

                    data = defaultFilter(data);
                } else if (filter && filter.constructor == Object) { // 如果传入的filter为对象
                    if (filter.default === undefined || filter.default) { // 如果对象的defaul字段未设置或者值为真，则采用默认过滤
                        data = defaultFilter(data);
                    }
                    if (filter.myFilter && typeof filter.myFilter == "function") { // 如果对象的myFilter字段存在并且为函数，采用此方法过滤一次data
                        data = filter.myFilter(data)
                    }
                }

                // 回调函数
                if (typeof callBack == "function") { // 如果传入的callBack为函数，执行回调函数
                    callBack({
                        data: data || [],
                        total: total
                    })
                }


                // 默认过滤方法
                function defaultFilter(data) {
                    var newData;
                    // 根据不同类型的表，选择不同的过滤fangfa
                    switch (tableType) {
                        case "historyTable":
                            newData = data.map(val => {
                                val.TM = FilterMethods.methods.dateFilter(val.TM); // 时间
                                val.Q = FilterMethods.methods.Float_Filter(val.VOL, 3); // 流量
                                val.Z = FilterMethods.methods.Float_Filter(val.Z) // 水位
                                return val;
                            })
                            break;
                        case "hourTable":
                            newData = data.map(val => {
                                val.DT = FilterMethods.methods.dateFilter(val.DT); // 时间
                                val.A_Q = FilterMethods.methods.Float_Filter(val.A_Q, 3); // 平均流量
                                val.A_Z = FilterMethods.methods.Float_Filter(val.A_Z) // 平均水位
                                val.WQ = FilterMethods.methods.Float_Filter(val.WQ, 3); // 小时累计水量
                                return val;
                            })
                            break;
                        case "dayTable":
                            newData = data.map(val => {
                                val.TM = FilterMethods.methods.dateFilter(val.TM); // 时间
                                val.DA_Q = FilterMethods.methods.Float_Filter(val.DA_Q, 3); // 日平均流量
                                val.DA_Z = FilterMethods.methods.Float_Filter(val.DA_Z) // 日平均水位
                                val.DWQ = FilterMethods.methods.Float_Filter(val.DWQ, 3); // 日累计水量
                                return val;
                            })
                            break;
                        case "Z_Q_relation":
                            newData = data.map(val => {
                                // val.YR = FilterMethods.methods.dateFilter(val.YR); // 年份
                                val.Q = FilterMethods.methods.Float_Filter(val.Q, 3); // 流量
                                val.Z = FilterMethods.methods.Float_Filter(val.Z) // 水位
                                return val;
                            })
                            break;
                        case "Gate_Z_Q_relation":
                            newData = data.map(val => {
                                val.Q = FilterMethods.methods.dateFilter(val.Q, 3); // 流量
                                val.OD = FilterMethods.methods.Float_Filter(val.OD); // 闸门开度
                                val.UPZ = FilterMethods.methods.Float_Filter(val.UPZ) // 闸前水位
                                val.DWZ = FilterMethods.methods.Float_Filter(val.DWZ); // 闸后水位
                                return val;
                            })
                            break;

                    }

                    return newData;
                }
            })
    },
    // 河流信息
    Base_R_I(body, filter, callBack) {
        axios.get(`/guanqu/admin/WRP_RVR_BSIN`, {
            params: body
        })
            .then(res => {

                var data = res.data.rows; // 数据
                var total = res.data.total; // 数据总条数

                // 过滤
                if (typeof filter == "function") { // 如果传入的filte为过滤方法
                    data = filter(data, total);
                } else if (typeof filter == "boolean" && filter) { // 如果传入的filter为布尔值，并且为真

                    data = defaultFilter(data);
                } else if (filter && filter.constructor == Object) { // 如果传入的filter为对象
                    if (filter.default === undefined || filter.default) { // 如果对象的defaul字段未设置或者值为真，则采用默认过滤
                        data = defaultFilter(data);
                    }
                    if (filter.myFilter && typeof filter.myFilter == "function") { // 如果对象的myFilter字段存在并且为函数，采用此方法过滤一次data
                        data = filter.myFilter(data)
                    }
                }

                // 回调函数
                if (typeof callBack == "function") { // 如果传入的callBack为函数，执行回调函数
                    callBack({
                        data: data || [],
                        total: total
                    })
                }


                // 默认过滤方法
                function defaultFilter(data) {
                    var newData;
                    
                    newData = data.map(val => {
                        // val.TM = FilterMethods.methods.dateFilter(val.TM); // 时间
                        // val.Q = FilterMethods.methods.Float_Filter(val.VOL, 3); // 流量
                        // val.Z = FilterMethods.methods.Float_Filter(val.Z) // 水位
                        return val;
                    })

                    return newData;
                }
            })
    },
    // 流域信息
    Base_B_I(body, filter, callBack) {
        axios.get(`/guanqu/admin/WRP_LY_BSIN`, {
            params: body
        })
            .then(res => {

                var data = res.data.rows; // 数据
                var total = res.data.total; // 数据总条数

                // 过滤
                if (typeof filter == "function") { // 如果传入的filte为过滤方法
                    data = filter(data, total);
                } else if (typeof filter == "boolean" && filter) { // 如果传入的filter为布尔值，并且为真

                    data = defaultFilter(data);
                } else if (filter && filter.constructor == Object) { // 如果传入的filter为对象
                    if (filter.default === undefined || filter.default) { // 如果对象的defaul字段未设置或者值为真，则采用默认过滤
                        data = defaultFilter(data);
                    }
                    if (filter.myFilter && typeof filter.myFilter == "function") { // 如果对象的myFilter字段存在并且为函数，采用此方法过滤一次data
                        data = filter.myFilter(data)
                    }
                }

                // 回调函数
                if (typeof callBack == "function") { // 如果传入的callBack为函数，执行回调函数
                    callBack({
                        data: data || [],
                        total: total
                    })
                }


                // 默认过滤方法
                function defaultFilter(data) {
                    var newData;
                    
                    newData = data.map(val => {
                        // val.TM = FilterMethods.methods.dateFilter(val.TM); // 时间
                        // val.Q = FilterMethods.methods.Float_Filter(val.VOL, 3); // 流量
                        // val.Z = FilterMethods.methods.Float_Filter(val.Z) // 水位
                        return val;
                    })

                    return newData;
                }
            })
    },
    // 监控模块

    // 历史统计类
    // 渠道水情
    Survey_History_QDSQ(tableType, body, filter, callBack) {
        var tableName;
        // 根据不同类型的表，选择数据库中对应的表名
        switch (tableType) {
            case "historyTable":
                tableName = "ST_Canal_R";
                break;
            case "hourTable":
                tableName = "ST_HCanal_C";
                break;
            case "dayTable":
                tableName = "ST_DCanal_C";
                break;
            case "monthTable":
                tableName = "View_ST_MCanal_C";
                break;
            case "maxQTable":
                tableName = "ST_G_CQORD";
                break;
            case "alarmTable":
                tableName = "ST_Canal_Alarm";
                break;
        }

        axios.get(`/guanqu/table/${tableName}`, {
        // axios.get(`/guanqu/admin/${tableName}`, {
            params: body
        })
            .then(res => {

                var data = res.data.rows; // 数据
                var total = res.data.total; // 数据总条数



                // 过滤
                if (typeof filter == "function") { // 如果传入的filte为过滤方法
                    data = filter(data, total);
                } else if (typeof filter == "boolean" && filter) { // 如果传入的filter为布尔值，并且为真

                    data = defaultFilter(data);
                } else if (filter && filter.constructor == Object) { // 如果传入的filter为对象
                    if (filter.default === undefined || filter.default) { // 如果对象的defaul字段未设置或者值为真，则采用默认过滤
                        data = defaultFilter(data);
                    }
                    if (filter.myFilter && typeof filter.myFilter == "function") { // 如果对象的myFilter字段存在并且为函数，采用此方法过滤一次data
                        data = filter.myFilter(data)
                    }
                }


                // 回调函数
                if (typeof callBack == "function") { // 如果传入的callBack为函数，执行回调函数
                    callBack({
                        data: data || [],
                        total: total
                    })
                }



                // 默认过滤方法
                function defaultFilter(data) {
                    var newData;
                    // 根据不同类型的表，选择不同的过滤fangfa
                    switch (tableType) {
                        case "historyTable":
                            newData = data.map(val => {
                                val.TM = FilterMethods.methods.dateFilter(val.TM); // 时间
                                val.Q = FilterMethods.methods.Float_Filter(val.Q, 3); // 流量
                                val.Z = FilterMethods.methods.Float_Filter(val.Z) // 水位
                                return val;
                            })
                            break;
                        case "hourTable":
                            newData = data.map(val => {
                                val.DT = `${FilterMethods.methods.dateFilter(val.DT)} ${val.TM}`; // 时间
                                val.A_Q = FilterMethods.methods.Float_Filter(val.A_Q, 3); // 平均流量
                                val.A_Z = FilterMethods.methods.Float_Filter(val.A_Z) // 平均水位
                                val.WQ = FilterMethods.methods.Float_Filter(val.WQ, 3); // 小时累计水量
                                return val;
                            })
                            break;
                        case "dayTable":
                            newData = data.map(val => {
                                val.TM = FilterMethods.methods.dateFilter(val.TM); // 时间
                                val.DA_Q = FilterMethods.methods.Float_Filter(val.DA_Q, 3); // 日平均流量
                                val.DA_Z = FilterMethods.methods.Float_Filter(val.DA_Z) // 日平均水位
                                val.DWQ = FilterMethods.methods.Float_Filter(val.DWQ, 3); // 日累计水量
                                return val;
                            })
                            break;
                        case "monthTable":
                            newData = data.map(val => {
                                val.DT = `${val.YE}-${val.MON}`; // 时间
                                val.MA_Q = FilterMethods.methods.Float_Filter(val.MA_Q, 3); // 月平均流量
                                val.MA_Z = FilterMethods.methods.Float_Filter(val.MA_Z) // 月平均水位
                                val.MWQ = FilterMethods.methods.Float_Filter(val.MWQ, 3); // 月累计水量
                                return val;
                            })
                            break;
                        case "maxQTable":
                            newData = data.map(val => {
                                val.TMMXQ = FilterMethods.methods.dateFilter(val.TMMXQ); // 年最大流量时间
                                val.TMXQ = FilterMethods.methods.Float_Filter(val.TMXQ, 3); // 年最大流量
                                val.YMXQZ = FilterMethods.methods.Float_Filter(val.YMXQZ) // 对应水位
                                return val;
                            })
                            break;
                        case "alarmTable":
                            newData = data.map(val => {
                                val.Q = FilterMethods.methods.Float_Filter(val.Q, 3); // 预警流量
                                val.Z = FilterMethods.methods.Float_Filter(val.Z) // 预警水位
                                val.JYQ = FilterMethods.methods.Float_Filter(val.JYQ, 3); // 经验预警流量
                                val.JYZ = FilterMethods.methods.Float_Filter(val.JYZ); // 经验预警水位
                                return val;
                            })
                            break;

                    }

                    return newData;
                }
            })

    },
    // 闸阀水情
    Survey_History_ZFSQ(tableType, body, filter, callBack) {
        var tableName;
        // 根据不同类型的表，选择数据库中对应的表名
        switch (tableType) {
            case "historyTable":
                tableName = "ST_WAS_R";
                break;
            case "hourTable":
                tableName = "ST_HWAS_C";
                break;
            case "dayTable":
                tableName = "ST_DWAS_C";
                break;
            case "monthTable":
                tableName = "View_ST_MWAS_C";
                break;
            case "maxQTable":
                tableName = "ST_G_WASQORD";
                break;
            case "alarmTable":
                tableName = "ST_Gate_Alarm";
                break;
        }

        axios.get(`/guanqu/table/${tableName}`, {
        // axios.get(`/guanqu/admin/${tableName}`, {
            params: body
        })
            .then(res => {

                var data = res.data.rows; // 数据
                var total = res.data.total; // 数据总条数



                // 过滤
                if (typeof filter == "function") { // 如果传入的filte为过滤方法
                    data = filter(data, total);
                } else if (typeof filter == "boolean" && filter) { // 如果传入的filter为布尔值，并且为真

                    data = defaultFilter(data);
                } else if (filter && filter.constructor == Object) { // 如果传入的filter为对象
                    if (filter.default === undefined || filter.default) { // 如果对象的defaul字段未设置或者值为真，则采用默认过滤
                        data = defaultFilter(data);
                    }
                    if (filter.myFilter && typeof filter.myFilter == "function") { // 如果对象的myFilter字段存在并且为函数，采用此方法过滤一次data
                        data = filter.myFilter(data)
                    }
                }

                // 回调函数
                if (typeof callBack == "function") { // 如果传入的callBack为函数，执行回调函数
                    callBack({
                        data: data || [],
                        total: total
                    })
                }

                // 默认过滤方法
                function defaultFilter(data) {
                    var newData;
                    // 根据不同类型的表，选择不同的过滤fangfa
                    switch (tableType) {
                        case "historyTable":
                            newData = data.map(val => {
                                val.TM = FilterMethods.methods.dateFilter(val.TM); // 日期过滤
                                val.UPZ = FilterMethods.methods.Float_Filter(val.UPZ); // 闸阀前水位过滤
                                val.DWZ = FilterMethods.methods.Float_Filter(val.DWZ); // 闸阀后水位过滤
                                val.Q = FilterMethods.methods.Float_Filter(val.Q, 3); // 流量过滤
                                return val;
                            })
                            break;
                        case "hourTable":
                            newData = data.map(val => {
                                val.DT = `${FilterMethods.methods.dateFilter(val.DT)} ${val.TM}`; // 时间
                                val.A_UPZ = FilterMethods.methods.Float_Filter(val.A_UPZ); // 平均闸阀前水位过滤
                                val.A_DWZ = FilterMethods.methods.Float_Filter(val.A_DWZ); // 平均闸阀后水位过滤
                                val.A_Q = FilterMethods.methods.Float_Filter(val.A_Q, 3); // 过闸平均流量过滤
                                val.WQ = FilterMethods.methods.Float_Filter(val.WQ, 3); // 小时累计过闸水量过滤
                                return val;
                            })
                            break;
                        case "dayTable":
                            newData = data.map(val => {
                                val.TM = FilterMethods.methods.dateFilter(val.TM); // 日期过滤
                                val.DA_UPZ = FilterMethods.methods.Float_Filter(val.DA_UPZ); // 平均闸阀前水位过滤
                                val.DA_DWZ = FilterMethods.methods.Float_Filter(val.DA_DWZ); // 平均闸阀后水位过滤
                                val.DA_Q = FilterMethods.methods.Float_Filter(val.DA_Q, 3); // 平均过闸流量过滤
                                val.DWQ = FilterMethods.methods.Float_Filter(val.DWQ, 3); // 日累计过闸水量过滤
                                return val;
                            })
                            break;
                        case "monthTable":
                            newData = data.map(val => {
                                val.TM = `${val.YE}-${val.MON}`
                                val.MA_UPZ = FilterMethods.methods.Float_Filter(val.MA_UPZ); // 平均闸阀前水位过滤
                                val.MA_DWZ = FilterMethods.methods.Float_Filter(val.MA_DWZ); // 平均闸阀后水位过滤
                                val.MA_Q = FilterMethods.methods.Float_Filter(val.MA_Q, 3); // 平均过闸流量过滤
                                val.MWQ = FilterMethods.methods.Float_Filter(val.MWQ, 3); // 月累计过闸水量过滤
                                return val;
                            })
                            break;
                        case "maxQTable":
                            newData = data.map(val => {
                                val.TMMXQ = FilterMethods.methods.dateFilter(val.TMMXQ); // 年最大流量时间
                                val.TMXQ = FilterMethods.methods.Float_Filter(val.TMXQ, 3); // 年最大流量
                                val.YMXUPQZ = FilterMethods.methods.Float_Filter(val.YMXUPQZ) // 对应闸前水位
                                val.YMXDNQZ = FilterMethods.methods.Float_Filter(val.YMXDNQZ) // 对应闸后水位
                                return val;
                            })
                            break;
                        case "alarmTable":
                            newData = data.map(val => {
                                val.Q = FilterMethods.methods.Float_Filter(val.Q, 3); // 预警流量
                                val.SZ = FilterMethods.methods.Float_Filter(val.SZ) // 预警闸前水位
                                val.EZ = FilterMethods.methods.Float_Filter(val.EZ) // 预警闸后水位
                                val.JYQ = FilterMethods.methods.Float_Filter(val.JYQ, 3); // 经验预警流量
                                val.JYSZ = FilterMethods.methods.Float_Filter(val.JYSZ); // 经验预警闸前水位
                                val.JYEZ = FilterMethods.methods.Float_Filter(val.JYEZ); // 经验预警闸后水位
                                return val;
                            })
                            break;

                    }

                    return newData;
                }
            })

    },
    // 闸阀状态
    Survey_History_ZFZT(tableType, body, filter, callBack) {
        var tableName;
        // 根据不同类型的表，选择数据库中对应的表名
        switch (tableType) {
            case "historyTable": // 历史表
                tableName = "ST_Gatage_H"
                break;

            case "openTimeTable": // 开启时长统计表
                tableName = "ST_Gatage_C"
                break;
        }

        axios.get(`/guanqu/table/${tableName}`, {
            params: body
        })
            .then(res => {

                var data = res.data.rows; // 数据
                var total = res.data.total; // 数据总条数



                // 过滤
                if (typeof filter == "function") { // 如果传入的filte为过滤方法
                    data = filter(data, total);
                } else if (typeof filter == "boolean" && filter) { // 如果传入的filter为布尔值，并且为真

                    data = defaultFilter(data);
                } else if (filter && filter.constructor == Object) { // 如果传入的filter为对象
                    if (filter.default === undefined || filter.default) { // 如果对象的defaul字段未设置或者值为真，则采用默认过滤
                        data = defaultFilter(data);
                    }
                    if (filter.myFilter && typeof filter.myFilter == "function") { // 如果对象的myFilter字段存在并且为函数，采用此方法过滤一次data
                        data = filter.myFilter(data)
                    }
                }

                // 回调函数
                if (typeof callBack == "function") { // 如果传入的callBack为函数，执行回调函数
                    callBack({
                        data: data || [],
                        total: total
                    })
                }



                // 默认过滤方法
                function defaultFilter(data) {
                    var newData;
                    // 根据不同类型的表，选择不同的过滤fangfa
                    switch (tableType) {
                        case "historyTable":
                            newData = data.map(val => {
                                val.TM = FilterMethods.methods.dateFilter(val.TM); // 时间
                                val.Q = FilterMethods.methods.Float_Filter(val.Q, 3); // 过闸流量
                                val.OD = FilterMethods.methods.Float_Filter(val.OD) // 闸门开度
                                val.UPZ = FilterMethods.methods.Float_Filter(val.UPZ) // 闸前水位
                                val.DWZ = FilterMethods.methods.Float_Filter(val.DWZ) // 闸后水位
                                return val;
                            })
                            break;
                        case "openTimeTable":
                            newData = data.map(val => {
                                // val.DT = FilterMethods.methods.dateFilter(val.DT); // 时间
                                // val.A_Q = FilterMethods.methods.Float_Filter(val.A_Q, 3); // 平均流量
                                // val.A_Z = FilterMethods.methods.Float_Filter(val.A_Z) // 平均水位
                                // val.WQ = FilterMethods.methods.Float_Filter(val.WQ, 3); // 小时累计水量
                                return val;
                            })
                            break;
                    }

                    return newData;
                }
            })

    },
    // 运行工况
    Survey_History_YXGK(tableType, body, filter, callBack) {
        var tableName;
        // 根据不同类型的表，选择数据库中对应的表名
        switch (tableType) {
            case "historyTable": // 历史表
                tableName = "ST_StationStatus_H"
                break;

            case "auxiliaryTable":
                tableName = "ST_StationStatusType"
                break;
        }

        axios.get(`/guanqu/admin/${tableName}`, {
            params: body
        })
            .then(res => {

                var data = res.data.rows; // 数据
                var total = res.data.total; // 数据总条数

                // 过滤
                if (typeof filter == "function") { // 如果传入的filte为过滤方法
                    data = filter(data, total);
                } else if (typeof filter == "boolean" && filter) { // 如果传入的filter为布尔值，并且为真

                    data = defaultFilter(data);
                } else if (filter && filter.constructor == Object) { // 如果传入的filter为对象
                    if (filter.default === undefined || filter.default) { // 如果对象的defaul字段未设置或者值为真，则采用默认过滤
                        data = defaultFilter(data);
                    }
                    if (filter.myFilter && typeof filter.myFilter == "function") { // 如果对象的myFilter字段存在并且为函数，采用此方法过滤一次data
                        data = filter.myFilter(data)
                    }
                }

                // 回调函数
                if (typeof callBack == "function") { // 如果传入的callBack为函数，执行回调函数
                    callBack({
                        data: data || [],
                        total: total
                    })
                }


                // 默认过滤方法
                function defaultFilter(data) {
                    var newData;
                    switch (tableType) {
                        case "historyTable":
                            newData = data.map(val => {
                                val.TM = FilterMethods.methods.dateFilter(val.TM); // 时间
                                val.VOL = FilterMethods.methods.Float_Filter(val.VOL); // 电压
                                val.CS = FilterMethods.methods.CS_Filter(val.CS) // 通讯状态
                                return val;
                            })
                            break;

                        case "auxiliaryTable":
                            // newData = data.map(val => {
                            //     val.TM = FilterMethods.methods.dateFilter(val.TM); // 时间
                            //     val.VOL = FilterMethods.methods.Float_Filter(val.VOL); // 电压
                            //     val.CS = FilterMethods.methods.CS_Filter(val.CS) // 通讯状态
                            //     return val;
                            // })
                            break;
                    }
                    return newData;
                }
            })

    },
    // 图像
    Survey_History_TX(body, filter, callBack) {
        axios.get(`/guanqu/table/ST_JPG_H`, {
            params: body
        })
            .then(res => {

                var data = res.data.rows; // 数据
                var total = res.data.total; // 数据总条数

                // 过滤
                if (typeof filter == "function") { // 如果传入的filte为过滤方法
                    data = filter(data, total);
                } else if (typeof filter == "boolean" && filter) { // 如果传入的filter为布尔值，并且为真

                    data = defaultFilter(data);
                } else if (filter && filter.constructor == Object) { // 如果传入的filter为对象
                    if (filter.default === undefined || filter.default) { // 如果对象的defaul字段未设置或者值为真，则采用默认过滤
                        data = defaultFilter(data);
                    }
                    if (filter.myFilter && typeof filter.myFilter == "function") { // 如果对象的myFilter字段存在并且为函数，采用此方法过滤一次data
                        data = filter.myFilter(data)
                    }
                }

                // 回调函数
                if (typeof callBack == "function") { // 如果传入的callBack为函数，执行回调函数
                    callBack({
                        data: data || [],
                        total: total
                    })
                }


                // 默认过滤方法
                function defaultFilter(data) {
                    var newData;
                    
                    newData = data.map(val => {
                        val.url = val.Save_Path; // 时间
                        // val.Q = FilterMethods.methods.Float_Filter(val.VOL, 3); // 流量
                        // val.Z = FilterMethods.methods.Float_Filter(val.Z) // 水位
                        return val;
                    })

                    return newData;
                }
            })
    }
}