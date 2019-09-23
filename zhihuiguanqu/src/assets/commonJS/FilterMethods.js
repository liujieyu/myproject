var FilterMethods =
{
    methods: {
        // 日期过滤器
        dateFilter(TM, number, type) {
            if (TM) {
                var dateArray = TM.split(' ');
                var date1 = dateArray[0].substring(2)
                var date2 = dateArray[1];
                // console.log(date1,date2)
                if (date2) {
                    date2 = date2.substring(0, number || 5)
                } else {
                    date2 = ''
                }

                if (type) {
                    switch (type) {
                        case "onlyDate":
                            return `${date1}`;

                        case "onlyTime":
                            return `${date2}${number == 2 ? ':00' : ''}`;
                    }
                }

                // return date;
                return `${date1}  ${date2}${number == 2 ? ':00' : ''}`;
            } else {
                return ''
            }
        },
        // 水位过滤器
        Z_Filter(Z, figure) {
            if (Z) {
                var Z = parseFloat(Z);

                if (Z !== 0) {
                    return Z.toFixed(figure || 2);
                }
                return '';
            } else {
                return ''
            }

        },
        // 浮点型数值过滤器
        Float_Filter(Z, figure) {
            if (Z) {
                var Z = parseFloat(Z);

                if (Z !== 0) {
                    return Z.toFixed(figure || 2);
                }
                return '';
            } else {
                return ''
            }

        },
        // 水势过滤器
        WPTN_Filter(WPTN) {
            if (WPTN) {
                var WPTN = parseInt(WPTN);
                var newWPTN;
                switch (WPTN) {
                    case 6:
                        newWPTN = {
                            status: WPTN,
                            symbol: "一"
                        };
                        break;
                    case 5:

                        newWPTN = {
                            status: WPTN,
                            symbol: "↑"
                        };
                        break;
                    case 4:

                        newWPTN = {
                            status: WPTN,
                            symbol: "↓"
                        };
                        break;
                    default:

                        newWPTN = {
                            status: 6,
                            symbol: "一"
                        };
                        break;

                }

                return newWPTN;
            } else {
                return {
                    status: 6,
                    symbol: "一"
                };
            }

        },
        // 通讯状态过滤器
        CS_Filter(CS) {
            if (CS && CS == 1) {
                return "正常"
            } else {
                return "不正常"
            }
        },
        // 
        STGR_Filter(STGR) {
            var STGR = parseInt(STGR);
            if (isNaN(STGR)) {
                return ""
            } else {
                var val;
                switch (STGR) {
                    case 1:
                        val = "国家重要站"
                        break;

                    case 2:
                        val = "省级重要站"
                        break;
                    case 3:
                        val = "一般站"
                        break;
                    case 4:
                        val = "实验或专用站"
                        break;
                    case 5:
                        val = "山洪站"
                        break;

                    case 6:
                        val = "临时站"
                        break;
                    case 7:
                        val = "其他站"
                        break;

                    case 8:
                        val = "灌区站"
                        break;
                }
                return val;
            }
        },
        // 站点大类归属过滤器
        STTP_Filter(STTP) {
            switch (STTP) {

                case "MM":
                    STTP = "气象站"
                    break;
                case "PP":
                    STTP = "雨量站"
                    break;
                case "BB":
                    STTP = "蒸发站"
                    break;
                case "ZQ":
                    STTP = "流量站"
                    break;
                case "DD":
                    STTP = "堰（闸）水位站"
                    break;
                case "ZZ":
                    STTP = "河道水位站"
                    break;
                case "TT":
                    STTP = "潮位站"
                    break;
                case "RR":
                    STTP = "水库站"
                    break;
                case "DP":
                    STTP = "泵站"
                    break;
                case "ZG":
                    STTP = "地下水位站"
                    break;
                case "SS":
                    STTP = "墒情站"
                    break;
                case "WQ":
                    STTP = "水质站"
                    break;
                case "SD":
                    STTP = "泥沙"
                    break;
                case "PH":
                    STTP = "图像站"
                    break;
                case "TV":
                    STTP = "视频站"
                    break;
                case "GC":
                    STTP = "闸控站"
                    break;
                case "CQ":
                    STTP = "渠道水位站"
                    break;
            }
            return STTP;
        },
        //动态统计图Y轴最大值
        get_echart_max(data) {
            var data = JSON.parse(JSON.stringify(data));
            data.forEach((val, index, array) => {
                if (val == '') {
                    array.splice(index, 1);
                }
            });
            var max = data[0];
            for (var i = 1; i < data.length; i++) {
                if (parseFloat(data[i]) > parseFloat(max)) {
                    max = data[i];
                }
            }
            return parseFloat(max);
        },
        //动态统计图Y轴最小值
        get_echart_min(data) {
            var data = JSON.parse(JSON.stringify(data));
            data.forEach((val, index, array) => {
                if (val == '') {
                    array.splice(index, 1);
                }
            });
            var min = data[0];
            for (var i = 1; i < data.length; i++) {
                if (parseFloat(data[i]) < parseFloat(min)) {
                    min = data[i];
                }
            }
            return parseFloat(min);
        },
        // 按层级截取行政区划码长度
        ADDVCD_Array_Filter(ADDVCD_Array) {
            var length = ADDVCD_Array.length;
            var lastADDVCD = ADDVCD_Array[length - 1];
            var likeADDVCD;
            switch (length) {
                case 1:
                    likeADDVCD = lastADDVCD.substring(0, 6);
                    break;
                case 2:
                    likeADDVCD = lastADDVCD.substring(0, 9);
                    break;
                case 3:
                    likeADDVCD = lastADDVCD.substring(0, 12);
                    break;
            }
            return likeADDVCD;
        },
        // 按层级截取渠道编码长度
        Canal_Code_Array_Filter(Canal_Code_Array) {
            var length = Canal_Code_Array.length;
            var lastCanal_Code = Canal_Code_Array[length - 1];
            var likeCanal_Code;
            switch (length) {
                case 1:
                    likeCanal_Code = lastCanal_Code.substring(0, 5);
                    break;
                case 2:
                    likeCanal_Code = lastCanal_Code.substring(0, 9);
                    break;
            }
            console.log("likeCanal_Code", Canal_Code_Array, likeCanal_Code);
            return likeCanal_Code;
        },
        // 渠道树
        QuDao_Tree_Filter(data) {
            // var totalLength = 0;

            data = addTitle(data, "canal_name"); // 增加标题

            var ganQuList = getGanQuList(data);

            // totalLength += ganQuList.length;

            ganQuList = ganQuList.map((val) => {
                // 支渠
                var this_ZhiquList = getZhiquList(data, val.canal_code);


                this_ZhiquList.map((zhuquVal) => { // 支渠站加其他渠道
                    var this_ZhiQuSite_otherQuDao_List = get_ZhiQuSite_otherQuDao_List(data, zhuquVal.canal_code);
                    zhuquVal.children = this_ZhiQuSite_otherQuDao_List;
                    // if (zhuquVal.children.length > 0) {
                    //     totalLength += zhuquVal.children.length;
                    //     console.log(zhuquVal.canal_name,zhuquVal.children);
                    // }
                    return zhuquVal;
                });

                // 干渠站
                var this_GanQuSiteList = getGanQuSiteList(data, val.canal_code);
                val.children = this_ZhiquList.concat(this_GanQuSiteList);
                // totalLength += val.children.length
                return val;
            })



            var other = {
                label: "其他",
                children: getOtherSiteList(data)
            };
            ganQuList.push(other);
            // totalLength += other.children.length
            // console.log("dataLength", data.length)
            // console.log("totalLength", totalLength)

            return ganQuList;

            // 函数
            function getGanQuList(data) {
                var newList;
                newList = data.filter((val, index) => {
                    if (val.Upper_Canal_code == -1 && val.bj == 1) {
                        return true;
                    }
                })
                return newList;
            }

            function getOtherSiteList(data) {
                var newList;
                newList = data.filter((val, index) => {
                    if (val.Upper_Canal_code == -1 && val.bj == 0) {
                        return true;
                    }
                })
                return newList;
            }

            function getZhiquList(data, Upper_Canal_code) {
                var newList;
                newList = data.filter((val, index) => {
                    if (val.Upper_Canal_code == Upper_Canal_code && val.bj == "1") {
                        return true
                    }
                })
                return newList
            }

            function getGanQuSiteList(data, Upper_Canal_code) {
                var newList;
                newList = data.filter((val, index) => {
                    if (val.Upper_Canal_code == Upper_Canal_code && val.bj == "0") {
                        return true
                    }
                })
                return newList
            }

            function get_ZhiQuSite_otherQuDao_List(data, Upper_Canal_code) {
                var newList;
                newList = data.filter((val, index) => {
                    if (val.Upper_Canal_code == Upper_Canal_code) {
                        return true
                    }
                })
                return newList
            }

            function addTitle(array, fieldName) {
                var newList;
                newList = array.map((val) => {
                    val.label = val[fieldName];
                    if (val.bj == 0) {
                        val.label = `${val[fieldName]}【站点】`;
                    }
                    return val;
                })
                return newList;
            }
        },
        // 行政区划树
        XingZheng_Tree_Filter(up_adcd, data) {

            data = addTitle(data, "ad_nm"); // 增加标题

            var Mogami = getMogami(up_adcd, data);

            // var total = Mogami.length;

            Mogami.map(val => {
                val.children = getChildrenList(val.ad_cd, data);
                // total += val.children.length;
                recursion(val.children, val.title);

                return val;
            })
            // console.warn("data",data.length)
            // console.warn("total",total)
            // console.warn("site",getSiteList(data))
            return Mogami;

            // 函数
            function getMogami(up_adcd, data) {
                var newList;
                newList = data.filter((val, index) => {
                    if (val.up_adcd == up_adcd) {
                        return true;
                    }
                })
                return newList;
            }

            function getChildrenList(ad_cd, data) {
                var newList;
                newList = data.filter((val, index) => {
                    if (val.up_adcd == ad_cd) {
                        return true;
                    }
                })
                return newList;
            }

            function getSiteList(data) {
                var newList;
                newList = data.filter((val, index) => {
                    if (val.bj == 0) {
                        return true;
                    }
                })
                return newList;
            }

            function recursion(children, title) {
                if (children.length > 0) {
                    children.map(val => {
                        val.children = getChildrenList(val.ad_cd, data);
                        // total += val.children.length;
                        recursion(val.children, val.title);
                        return val
                    })

                }
            }

            function addTitle(array, fieldName) {
                var newList;
                newList = array.map((val) => {
                    val.label = val[fieldName];
                    if (val.bj == 0) {
                        val.label = `${val[fieldName]}【站点】`;
                    }
                    
                    return val;
                })
                return newList;
            }
        },
        // 饿了么日期选择器值过滤
        elDatePicker_Filter(date, type) {
            if (date.constructor === Array) {
                var start, start_Year, start_Month, start_Day, start_Hours, start_Minutes;
                start = date[0];
                start_Year = start.getFullYear();
                start_Month = addZero((start.getMonth() + 1));
                start_Day = addZero(start.getDate());
                start_Hours = addZero(start.getHours());
                start_Minutes = addZero(start.getMinutes());

                start = `${start_Year}-${start_Month}-${start_Day} ${start_Hours}:${start_Minutes}`;

                var end, end_Year, end_Month, end_Day, end_Hours, end_Minutes;
                end = date[1];
                end_Year = end.getFullYear();
                end_Month = addZero(end.getMonth() + 1);
                end_Day = addZero(end.getDate());
                end_Hours = addZero(end.getHours());
                end_Minutes = addZero(end.getMinutes());

                end = `${end_Year}-${end_Month}-${end_Day} ${end_Hours}:${end_Minutes}`;

                if (type) {
                    switch (type) {
                        case "monthTable":
                            return `btt,${start_Year}-${start_Month}-1,${end_Year}-${end_Month}-30`
                        // return {
                        //     YE: `bt,${start_Year},${end_Year}`,
                        //     MON: `bt,${start_Month},${end_Month}`
                        // }

                        case "maxQTable":
                            return `bt,${start_Year},${end_Year}`

                    }

                }

                return `btt,${start},${end}`;


            } else if (date.constructor === Date) {
                var Year, Month, Day, Hours, Minutes;
                Year = date.getFullYear();
                Month = addZero((date.getMonth() + 1));
                Day = addZero(date.getDate());
                Hours = addZero(date.getHours());
                Minutes = addZero(date.getMinutes());

                switch (type) {
                    case "onlyYear":

                        return Year;

                    case "onlyMonth":

                        break;

                    default:
                        break;
                }

            }

            function addZero(item) {
                item = String(item);
                if (item.length == 1) {
                    return `0${item}`
                }

                return item;
            }

        },
        // 排序过滤
        sort_Filter(item) {
            var order = item.order,
                key = item.key;
            switch (order) {
                case "normal":
                    return null;
                case "asc": // 升序
                    return `${key}`;
                case "desc": // 降序
                    return `${key} desc`;
            }
        },
        // 渠道水情历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象
        transform_QDSQ_data_into_ehart_data(data, tableType) {
            var _data = JSON.parse(JSON.stringify(data)); // 数据深拷贝
            _data = _data.reverse(); // 数组倒序

            var echartData = {
                chartName: "",
                x: new Object(),
                y1: new Object(),
                y2: new Object(),
                y3: new Object(),
            }
            switch (tableType) {
                case "historyTable":
                    echartData.chartName = "历史表";


                    // y1轴
                    echartData.y1.name = "流量"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "Q", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });

                    var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                        y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    echartData.y1.max = y1max; // y1最大值
                    echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值

                    // y2轴
                    echartData.y2.name = "水位"; // Y2轴名字

                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "Z", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                        y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    echartData.y2.max = y2max; // y2最大值
                    echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        // var time = `${index}:00 ~ ${index + 1}:00`;
                        var time = val.TM;
                        return time;
                    });


                    break;
                case "hourTable":
                    echartData.chartName = "小时表";


                    // y1轴
                    echartData.y1.name = "平均流量"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "A_Q", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });

                    var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                        y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    echartData.y1.max = y1max; // y1最大值
                    echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值

                    // y2轴
                    echartData.y2.name = "平均水位"; // Y2轴名字

                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "A_Z", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                        y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    echartData.y2.max = y2max; // y2最大值
                    echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值

                    // y3轴
                    echartData.y3.name = "小时累计水量"; // Y2轴名字

                    echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "WQ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        var time = val.DT;
                        return time;
                    });

                    break;
                case "dayTable":
                    echartData.chartName = "日表";


                    // y1轴
                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "DA_Q", val => {
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });

                    var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                        y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    echartData.y1.max = y1max; // y1最大值
                    echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值

                    echartData.y1.name = "日平均流量"; // Y1轴名字


                    // y2轴
                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "DA_Z", val => {
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                        y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    echartData.y2.max = y2max; // y2最大值
                    echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值

                    echartData.y2.name = "日平均水位"; // Y2轴名字

                    // y3轴
                    echartData.y3.name = "日累计水量"; // Y2轴名字

                    echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "DWQ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        var time = val.TM;
                        return time;
                    });
                    break;
                case "monthTable":
                    echartData.chartName = "月表";


                    // y1轴
                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "MA_Q", val => {
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });

                    var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                        y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    echartData.y1.max = y1max; // y1最大值
                    echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值

                    echartData.y1.name = "月平均流量"; // Y1轴名字


                    // y2轴
                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "MA_Z", val => {
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                        y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    echartData.y2.max = y2max; // y2最大值
                    echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值

                    echartData.y2.name = "月平均水位"; // Y2轴名字

                    // y3轴
                    echartData.y3.name = "月累计水量"; // Y2轴名字

                    echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "MWQ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });


                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        var time = val.DT;
                        return time;
                    });
                    break;

            }

            return echartData;
        },
        // 闸阀水情历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象
        transform_ZFSQ_data_into_ehart_data(data, tableType) {
            var _data = JSON.parse(JSON.stringify(data)); // 数据深拷贝
            _data = _data.reverse(); // 数组倒序

            var echartData = {
                chartName: "",
                x: new Object(),
                y1: new Object(),
                y2: new Object(),
                y3: new Object(),
                y: new Object()
            }
            switch (tableType) {
                case "historyTable":
                    echartData.chartName = "历史表";


                    // y1轴
                    echartData.y1.name = "流量"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "Q", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });

                    var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                        y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    echartData.y1.max = y1max; // y1最大值
                    echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值

                    // y2轴
                    echartData.y2.name = "闸上水位"; // Y2轴名字

                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "UPZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                        y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    echartData.y2.max = y2max; // y2最大值
                    echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值

                    // y3轴
                    echartData.y3.name = "闸下水位"; // Y3轴名字

                    echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "DWZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y3max = (FilterMethods.methods.get_echart_max(echartData.y3.list) + 0.5).toFixed(2),
                        y3min = (FilterMethods.methods.get_echart_min(echartData.y3.list) - 0.5).toFixed(2);
                    echartData.y3.max = y3max; // y2最大值
                    echartData.y3.min = y3min < 0 ? 0 : y3min; // y2最小值

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        // var time = `${index}:00 ~ ${index + 1}:00`;
                        var time = val.TM;
                        return time;
                    });

                    // y轴
                    var ymax_list = [y1max, y2max, y3max]
                    var ymax = FilterMethods.methods.get_echart_max(ymax_list);
                    var ymin_list = [y1max, y2max, y3max]
                    var ymin = FilterMethods.methods.get_echart_max(ymin_list);

                    echartData.y.max = ymax;
                    echartData.y.min = ymin;

                    break;
                case "hourTable":
                    echartData.chartName = "小时表";


                    // y1轴
                    echartData.y1.name = "流量"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "WQ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });

                    var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                        y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    echartData.y1.max = y1max; // y1最大值
                    echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值

                    // y2轴
                    echartData.y2.name = "闸上水位"; // Y2轴名字

                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "A_UPZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                        y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    echartData.y2.max = y2max; // y2最大值
                    echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值

                    // y3轴
                    echartData.y3.name = "闸下水位"; // Y3轴名字

                    echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "A_DWZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y3max = (FilterMethods.methods.get_echart_max(echartData.y3.list) + 0.5).toFixed(2),
                        y3min = (FilterMethods.methods.get_echart_min(echartData.y3.list) - 0.5).toFixed(2);
                    echartData.y3.max = y3max; // y2最大值
                    echartData.y3.min = y3min < 0 ? 0 : y3min; // y2最小值

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        // var time = `${index}:00 ~ ${index + 1}:00`;
                        var time = val.DT;
                        return time;
                    });


                    break;
                case "dayTable":
                    echartData.chartName = "日表";


                    // y1轴
                    echartData.y1.name = "流量"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "DWQ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });

                    var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                        y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    echartData.y1.max = y1max; // y1最大值
                    echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值

                    // y2轴
                    echartData.y2.name = "日均闸上水位"; // Y2轴名字

                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "DA_UPZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                        y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    echartData.y2.max = y2max; // y2最大值
                    echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值

                    // y3轴
                    echartData.y3.name = "日均闸下水位"; // Y3轴名字

                    echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "DA_DWZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y3max = (FilterMethods.methods.get_echart_max(echartData.y3.list) + 0.5).toFixed(2),
                        y3min = (FilterMethods.methods.get_echart_min(echartData.y3.list) - 0.5).toFixed(2);
                    echartData.y3.max = y3max; // y2最大值
                    echartData.y3.min = y3min < 0 ? 0 : y3min; // y2最小值

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        // var time = `${index}:00 ~ ${index + 1}:00`;
                        var time = val.TM;
                        return time;
                    });


                    break;
                case "monthTable":
                    echartData.chartName = "月表";


                    // y1轴
                    echartData.y1.name = "流量"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "DWQ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });

                    var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                        y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    echartData.y1.max = y1max; // y1最大值
                    echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值

                    // y2轴
                    echartData.y2.name = "月均闸上水位"; // Y2轴名字

                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "MA_UPZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                        y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    echartData.y2.max = y2max; // y2最大值
                    echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值

                    // y3轴
                    echartData.y3.name = "月均闸下水位"; // Y3轴名字

                    echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "MA_DWZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y3max = (FilterMethods.methods.get_echart_max(echartData.y3.list) + 0.5).toFixed(2),
                        y3min = (FilterMethods.methods.get_echart_min(echartData.y3.list) - 0.5).toFixed(2);
                    echartData.y3.max = y3max; // y2最大值
                    echartData.y3.min = y3min < 0 ? 0 : y3min; // y2最小值

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        // var time = `${index}:00 ~ ${index + 1}:00`;
                        var time = val.TM;
                        return time;
                    });
                    break;

            }

            return echartData;
        },
        // 闸阀状态历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象
        transform_ZFZT_data_into_ehart_data(data, tableType) {
            var _data = JSON.parse(JSON.stringify(data)); // 数据深拷贝
            _data = _data.reverse(); // 数组倒序

            var echartData = {
                chartName: "",
                x: new Object(),
                y1: new Object(),
                y2: new Object(),
                y3: new Object(),
                y4: new Object(),
                y: new Object()
            }
            switch (tableType) {
                case "historyTable":
                    echartData.chartName = "历史表";


                    // y1轴
                    echartData.y1.name = "流量"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "Q", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });

                    var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                        y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    echartData.y1.max = y1max; // y1最大值
                    echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值

                    // y2轴
                    echartData.y2.name = "闸上水位"; // Y2轴名字

                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "UPZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(3),
                        y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(3);
                    echartData.y2.max = y2max; // y1最大值
                    echartData.y2.min = y2min < 0 ? 0 : y2min; // y1最小值

                    // y3轴
                    echartData.y3.name = "闸下水位"; // Y3轴名字

                    echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "DWZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y3max = (FilterMethods.methods.get_echart_max(echartData.y3.list) + 0.5).toFixed(3),
                        y3min = (FilterMethods.methods.get_echart_min(echartData.y3.list) - 0.5).toFixed(3);
                    echartData.y3.max = y3max; // y3最大值
                    echartData.y3.min = y3min < 0 ? 0 : y3min; // y3最小值

                    // y4轴
                    echartData.y4.name = "闸门开度"; // Y3轴名字

                    echartData.y4.list = FilterMethods.methods.newArrayByObjArray(_data, "OD", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y4max = (FilterMethods.methods.get_echart_max(echartData.y4.list) + 0.5).toFixed(3),
                        y4min = (FilterMethods.methods.get_echart_min(echartData.y4.list) - 0.5).toFixed(3);
                    echartData.y4.max = y4max; // y4最大值
                    echartData.y4.min = y4min < 0 ? 0 : y4min; // y4最小值

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        // var time = `${index}:00 ~ ${index + 1}:00`;
                        var time = val.TM;
                        return time;
                    });

                    // y轴
                    var ymax_list = [y1max, y2max, y3max, y4max]
                    var ymax = FilterMethods.methods.get_echart_max(ymax_list);
                    var ymin_list = [y1max, y2max, y3max, y4max]
                    var ymin = FilterMethods.methods.get_echart_max(ymin_list);

                    echartData.y.max = ymax;
                    echartData.y.min = ymin;

                    break;

            }

            return echartData;
        },
        // 闸阀状态历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象
        transform_ZFZT_data_into_ehart_data(data, tableType) {
            var _data = JSON.parse(JSON.stringify(data)); // 数据深拷贝
            _data = _data.reverse(); // 数组倒序

            var echartData = {
                chartName: "",
                x: new Object(),
                y1: new Object(),
                y2: new Object(),
                y3: new Object(),
                y4: new Object(),
                y: new Object()
            }
            switch (tableType) {
                case "historyTable":
                    echartData.chartName = "历史表";


                    // y1轴
                    echartData.y1.name = "流量"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "Q", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });

                    var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                        y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    echartData.y1.max = y1max; // y1最大值
                    echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值

                    // y2轴
                    echartData.y2.name = "闸上水位"; // Y2轴名字

                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "UPZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(3),
                        y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(3);
                    echartData.y2.max = y2max; // y1最大值
                    echartData.y2.min = y2min < 0 ? 0 : y2min; // y1最小值

                    // y3轴
                    echartData.y3.name = "闸下水位"; // Y3轴名字

                    echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "DWZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y3max = (FilterMethods.methods.get_echart_max(echartData.y3.list) + 0.5).toFixed(3),
                        y3min = (FilterMethods.methods.get_echart_min(echartData.y3.list) - 0.5).toFixed(3);
                    echartData.y3.max = y3max; // y3最大值
                    echartData.y3.min = y3min < 0 ? 0 : y3min; // y3最小值

                    // y4轴
                    echartData.y4.name = "闸门开度"; // Y3轴名字

                    echartData.y4.list = FilterMethods.methods.newArrayByObjArray(_data, "OD", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y4max = (FilterMethods.methods.get_echart_max(echartData.y4.list) + 0.5).toFixed(3),
                        y4min = (FilterMethods.methods.get_echart_min(echartData.y4.list) - 0.5).toFixed(3);
                    echartData.y4.max = y4max; // y4最大值
                    echartData.y4.min = y4min < 0 ? 0 : y4min; // y4最小值

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        // var time = `${index}:00 ~ ${index + 1}:00`;
                        var time = val.TM;
                        return time;
                    });

                    // y轴
                    var ymax_list = [y1max, y2max, y3max, y4max]
                    var ymax = FilterMethods.methods.get_echart_max(ymax_list);
                    var ymin_list = [y1max, y2max, y3max, y4max]
                    var ymin = FilterMethods.methods.get_echart_max(ymin_list);

                    echartData.y.max = ymax;
                    echartData.y.min = ymin;

                    break;

            }

            return echartData;
        },

        // 运行工况历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象
        transform_YXGK_data_into_ehart_data(data, tableType) {
            var _data = JSON.parse(JSON.stringify(data)); // 数据深拷贝
            _data = _data.reverse(); // 数组倒序

            var echartData = {
                chartName: "",
                x: new Object(),
                y1: new Object(),
                y2: new Object(),
            }
            echartData.chartName = "";

            switch (tableType) {
                case "zhuangtaishuju":
                    // y1轴
                    echartData.y1.name = "电压"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "VOL", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });

                    var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                        y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    echartData.y1.max = y1max; // y1最大值
                    echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值


                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {

                        var time = val.TM;
                        time = time.substring(3)
                        return time;
                    });
                    break;

            }



            return echartData;
        },

        // 抽离对象数组中每一项对象中某字段组合成新的数组
        newArrayByObjArray(array, attr, callback) {
            var newArray = array.map(val => {
                var newVal = val[attr];
                if (typeof callback == "function") {
                    newVal = callback(newVal);
                }
                return newVal;
            });
            return newArray;
        }
    },

}

export default FilterMethods