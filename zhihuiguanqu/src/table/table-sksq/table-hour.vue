<template>
    <div>
        <Content :style="{padding: '24px', background: '#fff'}">
                    <Row type="flex" :gutter="16" justify="end">
                        <Col>
                            归属单位:
                            <Select v-model="form.zdlx" style="width:120px;margin-left: 5px;" @on-change="TYPEsearch" clearable>
                                <Option v-for="item in gsdwlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </Col>
                        <Col>
                            水库等级:
                            <Select v-model="form.zdlx" style="width:120px;margin-left: 5px;" @on-change="TYPEsearch" clearable>
                                <Option v-for="item in skdjlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </Col>
                        <Col> 
                            <Button type="primary" style="width: auto;margin-right: 20px;" @click="err">导出</Button>
                        </Col>
                        <Col>
                        <!-- 站名模糊搜索 -->
                            <Input search enter-button suffix="ios-search" placeholder="请输入站名" style="width: auto;margin-right: 20px;" @on-search="search" v-model="form.searchmsg" />
                        </Col>
                    </Row>
                    <Row type="flex" style="margin: 10px;" :gutter="16" justify="end">
                        <Col>
                        时间:
                        <el-date-picker
                        v-model="form.date"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right"
                        @change="timechange"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :clearable="false"
                        size="small"
                        width="200"
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
                            渠道:
                            <!-- 渠道级联选择器 -->
                            <el-cascader
                              clearable
                              size="small"
                              placeholder="请选择渠道"
                              :options="form.qudaoList"
                              v-model="form.model_qudao"
                              @change="QDsearch"
                              change-on-select
                            ></el-cascader>
                        </Col>
                    </Row>
                    <Divider />
                    <Row style="font-size: 16px;">
                        <!-- <Col style="text-align: center;margin: 0 0 10px 0;">
                           共{{data.length}}个站点
                        </Col> -->
                        <Col style='font-size: 14px;text-align: center;'>共{{data.length}}个站点&nbsp;
                      汛限水位：m，正常蓄水位：m，平均水位：m，平均入库流量：m³/s，平均出库流量m³/s，小时蓄水量：10⁶m³</Col>
                    </Row>
                    <el-table
                        :data="data"
                        border
                        height="480"
                        v-loading="loading"
                        style="width: 100%"
                        @cell-click="cellclick"
                        >
                        <el-table-column
                          prop="DT"
                          label="时间"
                          align="center"
                          fixed
                          width="140">
                        </el-table-column>
                        <el-table-column
                          prop="STNM"
                          :label="item.STNM"
                          align="center"
                          width="" v-for="(item,key) in data" :key="key">
                          
                          <el-table-column
                          prop="A_UPZ"
                          label="闸阀上水位"
                          align="center"
                          width="160"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="A_DWZ"
                          label="闸阀下水位"
                          align="center"
                          width="160"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="A_Q"
                          label="平均流量"
                          align="center"
                          width="160"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="WQ"
                          label="小时累计流量"
                          align="center"
                          width="160"
                          >
                        </el-table-column>

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
    import App from "@/App.vue";
    export default {
        data(){
            return{
                gsdwlist:[
                {
                    value:'1',
                    label:'国家重要站'
                },
                {
                    value:'2',
                    label:'省级重要站'
                },
                {
                    value:'3',
                    label:'一般站'
                },
                {
                    value:'4',
                    label:'实验或专用站'
                },
                {
                    value:'5',
                    label:'山洪站'
                },
                {
                    value:'6',
                    label:'临时站'
                },
                {
                    value:'7',
                    label:'其他站'
                },
                {
                    value:'8',
                    label:'灌区站'
                },
                ],
                skdjlist:[
                {
                    value:'1',
                    label:'大型'
                },
                {
                    value:'2',
                    label:'中型'
                },
                {
                    value:'3',
                    label:'小I型'
                },
                {
                    value:'4',
                    label:'小II型'
                },
                {
                    value:'5',
                    label:'山塘'
                },
                ],
                form:{
                    adressList:[], 
                    qudaoList:[],
                    model_adress:'',
                    zdlx:'',
                    model_qudao:'',
                    date:[],   
                    searchmsg:'',
                },
                date:'',
                xzqhdata:[],
                xzqh:'',
                loading:false,
                list_input:{
                    total:100,
                    pagesize:50,
                    pagesizeopts:[10,20,50,75,100,200],
                    current:1,
                },
                data: [],
                searchs:'',
                timesearch:'',
                pickerOptions2: {
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
            }
        },
        // 引入过滤方法到此组件
        mixins: [FilterMethods,GetDataMethods],
        mounted(){
            var date = new Date();
            var Month = date.getMonth()+1;
            this.timesearch = '&DT='+date.getFullYear()+'-'+Month+'-'+date.getDate()+'&TM='+date.getHours();
            this.Reload();
        },
        methods:{
            cellclick(row, column, cell, event){
              var evt = new Object();
              evt.graphic = new Object();
              evt.graphic.attributes = row;
              evt.graphic.attributes.itype = "zhafashuiqing";
              evt.graphic.attributes.rowinfo = JSON.parse(JSON.stringify(row))
              evt.graphic.attributes.rowinfo.tableType = {
                zfsq: "hourTable"
              };
              var v = new Object;
              v.itype = "zhafashuiqing";
              console.log("evt",evt);
              this.$App.showDrawer(evt, v);
            },
            timechange(){
                console.log(this.form.date[0]);
                this.timesearch = '&DT=bt,'+this.form.date[0]+','+this.form.date[1];
                this.Reload();
                this.timesearch = '';
            },

            Reload(){
                this.loading = true;
                this.axios.get('/guanqu/admin/ST_HWAS_C?_page_size='+this.list_input.pagesize+'&_page='+this.list_input.current+this.searchs+this.timesearch).then((res)=>{
                    this.loading = false;
                    console.log(res);
                    this.data = res.data.rows;
                    this.list_input.total = res.data.total;
                    for (var i = 0;i<this.data.length ; i++) {
                        this.data[i].A_DWZ = this.Z_Filter(this.data[i].A_DWZ);
                        this.data[i].A_UPZ = this.Z_Filter(this.data[i].A_UPZ);
                        this.data[i].WQ = this.Z_Filter(this.data[i].WQ, 3);
                        this.data[i].A_Q = this.Z_Filter(this.data[i].A_Q, 3);
                        this.data[i].DT = this.data[i].DT +' '+ this.data[i].TM+':00';
                    }
                    //行政区划
                    this.getTableData_WRP_AD_B(data => {
                        this.form.adressList = data;
                    });
                    // 获取输排水渠道数据,然后设置渠道选择框选项
                    this.getTableData_WRP_IrrBTCanalSystem(data => {
                        this.form.qudaoList = data;
                    });
                    this.axios.get('/guanqu/admin/ST_WAS_R1?_page_size=9999').then((res)=>{

                    });
                });
                
                    
            },
            
            search(){
              if (this.form.searchmsg != '') {
                this.searchs = '&STNM=like,'+this.form.searchmsg;
                this.Reload()
              }else{
                this.searchs = '';
                this.Reload()
              }
            },
            // 处理页码切换
            CurrentChange(index) {
                // console.log(index);
              this.list_input.current = index;
              this.data[0].ID = index*this.list_input.pagesize;
              this.Reload();
            },
            // 处理每页显示条数切换
            PagesizeChange(pagesize) {
                // console.log(pagesize)
              this.list_input.pagesize = pagesize;
              this.Reload();
            },
            err(){
              // console.log("showDrawer",this.$showDrawer);
                this.$Message.warning('该功能还在开发中...');
            },
        },
        components: {

        },
        created(){
          console.dir("showDrawer",this.$showDrawer)
        }
    }
</script>

<style type="text/css">
    
</style>