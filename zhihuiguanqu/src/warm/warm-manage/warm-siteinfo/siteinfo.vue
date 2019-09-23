<template>
	<div>
		<Content class="searchcon">
                    <Row type="flex" :gutter="16" class="rowtocol">
                        <Col>
                        时间：
                        <el-date-picker
                        v-model="form.date"
                        type="datetimerange"
                        format="yyyy-MM-dd HH"
                        :picker-options="pickerOptions"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        size="small"
                        clearable
                        @change="timechange"
                        style="width:380px;"
                        >
                        </el-date-picker>
                        </Col>

                        <Col>
                            行政区划:
                            <!-- 地址级联选择器 -->
                            <el-cascader
                              clearable
                              size="small"
                              placeholder="请选择地址"
                              :options="form.adressList"
                              v-model="form.model_adress"
                              @change="XZQHsearch"
                              change-on-select
                            ></el-cascader>
                        </Col>     

                        <Col>
                            预警等级:
                            <Select v-model="form.yjdj" @on-change="TYPEsearch" style="width:120px;margin-left: 5px;margin-right: 20px;" clearable>
                                <Option v-for="item in yjdjlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </Col>

                        <Col>
                        <!-- 站名模糊搜索 -->
                            <Input search enter-button suffix="ios-search" placeholder="请输入站名" style="width: auto;margin-right: 20px;" @on-search="search" v-model="form.searchmsg" />
                        </Col>

                        <Col> 
                            <Button type="primary" style="width: auto;margin-right: 20px;" @click="err">导出</Button>
                        </Col>

                    </Row>
                    <Divider />
                    <el-table
                        :data="data"
                        border
                        height="500"
                        v-loading="loading"
                        style="width: 100%"
                        @cell-click="cellclick"
                        @sort-change="sort_change"
                        >
                        <el-table-column
                          label=" "
                          prop="ROWID"
                          align="center"
                          width="65"
                          fixed="left"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="STNM"
                          label="站名"
                          align="center"
                          fixed="left"
                          sortable="custom"
                          width="180">
                        </el-table-column>
                        <el-table-column
                          prop="TYPENAME"
                          label="监测类型"
                          align="center"
                          sortable="custom"
                          width="240">
                        </el-table-column>
                        <el-table-column
                          prop="TMSTR"
                          label="预警时间"
                          align="center"
                          sortable="custom"
                          width="240"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="ALARMNAME"
                          label="预警等级"
                          align="center"
                          sortable="custom"
                          width="120"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="CONTENTS"
                          label="预警内容"
                          align="center"
                          sortable="custom"
                          width="360"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="MV"
                          label="测量值"
                          align="center"
                          sortable="custom"
                          width="120"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="AlARMV"
                          label="预警指标"
                          sortable="custom"
                          align="center"
                          width="120"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="ADNM"
                          label="站址"
                          align="center"
                          sortable="custom"
                          width="300"
                          >
                        </el-table-column>
                      </el-table>
                    <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <Page 
                            :total="list_input.total" 
                            :current="list_input.current" show-sizer 
                            :page-size="list_input.pagesize" :page-size-opts="list_input.pagesizeopts"
                            @on-change="CurrentChange"
                            @on-page-size-change="PagesizeChange"
                            size="small"
                            show-total
                            show-elevator
                            ></Page>
                        </div>
                    </div>
                </Content>
	</div>
</template>

<script type="text/javascript">
        import FilterMethods from "@/assets/commonJS/FilterMethods";
        import GetDataMethods from "@/assets/commonJS/GetDataMethods";
        import WarmDataConfig from "@/assets/commonJS/WarmDataConfig"
	export default {
        data(){
            return{
                loading:false,
                pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
                yjdjlist:[],
                form:{
                    adressList:[], 
                    model_adress:'',
                    yjdj:'',
                    model_qudao:'',
                    date:[],   
                    searchmsg:'',
                    xzqh:'',
                    qd:'',
                    orderby:'TMSTR',
                    sequence:'desc',
                },
                date:'',
                data:[],
                list_input:{
                    total:100,
                    pagesize:50,
                    pagesizeopts:[10,20,50,75,100,200],
                    current:1,
                },
            }
        },
                // 引入过滤方法到此组件
        mixins: [FilterMethods,GetDataMethods,WarmDataConfig],
        mounted(){
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            this.form.date=[start,end];
            this.Reload();
        },
        methods:{
            timechange(date){
                this.form.date = date;
                this.Reload();
            },
            Reload(){
                this.loading = true;
                if (this.form.model_adress.length == 0) {
                  this.form.xzqh = null; 
                }
                if (this.form.model_adress.length == 1) {
                  var str1 = this.form.model_adress[0];
                  str1 = str1.substring(0,6);
                  this.form.xzqh = str1; 
                }
                if (this.form.model_adress.length == 2) {
                  var str2 = this.form.model_adress[1];
                  str2 = str2.substring(0,9);
                  this.form.xzqh = str2; 
                }
                if (this.form.model_adress.length == 3) {
                  var str3 = this.form.model_adress[2];
                  str3 = str3.substring(0,12);
                  this.form.xzqh = str3; 
                }
                var _currentPage = this.list_input.current;
                var _pageSizes = this.list_input.pagesize;
                var _bgincount=(_currentPage - 1) * _pageSizes+1;
                var _endcount=_currentPage * _pageSizes;  
                
                var timecon=this.datetimeFilter(this.form.date);
                
                this.axios.get('/table_war_exploded/alarm/sitealarm',{params:{begintime:timecon[0],endtime:timecon[1],begincount:_bgincount,endcount:_endcount,adcd:this.form.xzqh,alarmlevel:this.form.yjdj,sitename:this.form.searchmsg,orderBy:this.form.orderby,sequence:this.form.sequence}}).then((res)=>{
                    this.loading = false;
                    this.data = res.data.rows;
                    this.list_input.total = res.data.total;
                });
                //行政区划
                this.getTableData_WRP_AD_B(data => {
                    this.form.adressList = data;
                });
                //预警等级
                this.Get_WrpFieldinfo('ST_AlarmInfo','Alarm',data => {
                    this.yjdjlist = data;
                });
            },
            // 处理页码切换
            CurrentChange(index) {
              this.list_input.current = index;
              this.Reload();
            },
            // 处理每页显示条数切换
            PagesizeChange(pagesize) {
              this.list_input.pagesize = pagesize;
              this.list_input.current=1;
              this.Reload();
            },
            //行政区划
            XZQHsearch(){
              this.Reload();
            },
            TYPEsearch(){
              this.Reload();
            },
            search(){
                this.Reload(); 
            },
            sort_change(item){
                if(item.order==null){
                    return;
                }
                if(item.order=="ascending"){
                    this.form.sequence="asc";
                }else{
                    this.form.sequence="desc";
                }
                this.form.orderby=item.prop;
                this.list_input.current=1;
                this.Reload();
            },
            datetimeFilter(date){
                var start, start_Year, start_Month, start_Day, start_Hours;
                start = date[0];
                start_Year = start.getFullYear();
                start_Month = this.addZero((start.getMonth() + 1));
                start_Day = this.addZero(start.getDate());
                start_Hours = this.addZero(start.getHours());

                start = `${start_Year}-${start_Month}-${start_Day} ${start_Hours}:00:00`;

                var end, end_Year, end_Month, end_Day, end_Hours;
                end = date[1];
                end_Year = end.getFullYear();
                end_Month = this.addZero(end.getMonth() + 1);
                end_Day = this.addZero(end.getDate());
                end_Hours = this.addZero(end.getHours());

                end = `${end_Year}-${end_Month}-${end_Day} ${end_Hours}:59:59`;
                var timearray=new Array();
                timearray.push(start);
                timearray.push(end);
                return timearray;
            },
            addZero(item) {
                item = String(item);
                if (item.length == 1) {
                    return `0${item}`
                }

                return item;
            },
        },
    }
</script>

<style type="text/css">
.ivu-divider-horizontal, .ivu-row {
    margin-bottom: 12px;
}
    .el-table th {  background-color: #f8f8f9;color:#515a6e;} 
    .el-table td, .el-table th { padding: 3px 0;}
    .el-table .el-table__row td {padding: 6px 0;}
    .searchcon {padding-left:24px;padding-right:24px;padding-top:12px;padding-bottom:24px;background: #fff;}
    .rowtocol .ivu-col {margin-top:12px;}
</style>