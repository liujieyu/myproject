import axios from 'axios';
var WarmDataConfig= {
    methods: {
        //获取灵活字段下拉框信息
        Get_WrpFieldinfo(formid,fieldid,callback){
            this.axios.get('/table_war_exploded/fieldinfo/common/'+formid+'&'+fieldid)
                    .then(res => {
                        var data = res.data;
                        
                        if (typeof callback == "function") {

                            callback(data);
                        }
                    });
        }
    }
}
export default WarmDataConfig