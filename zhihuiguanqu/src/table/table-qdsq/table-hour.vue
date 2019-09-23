<template>
	<div>
		<Content class="searchcon">
                    <Row type="flex" :gutter="16" class="rowtocol">
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
                              @change="search"
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
                              @change="search"
                              change-on-select
                            ></el-cascader>
                        </Col>
                        <Col>
                            站点类型:
                            <Select v-model="form.zdlx" style="width:120px;margin-left: 5px;" @change="search">
                                <Option v-for="item in zdlxlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
                    <Row style="font-size: 16px;">
                        <!-- <Col style="text-align: center;margin: 0 0 10px 0;">
                           共{{data.length}}个站点
                        </Col> -->
                        <Col style='font-size: 14px;text-align: center;'>共{{data.length}}个站点&nbsp;
                      平均水位：m，平均流量：m³/s，小时累计水量：m³</Col>
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
                          prop="dt"
                          label="时间"
                          align="center"
                          fixed
                          width="140">
                        </el-table-column>
                        <el-table-column
                          :label="item"
                          align="center"
                          width="150" v-for="(item,index) in cols1" :key="index">
                          <!-- <el-table-column
                          :prop="val.item.pingjunshuiwei"
                          label="平均水位"
                          align="center"
                          width="160"
                          >
                        </el-table-column> -->
                        <!-- <el-table-column
                          :prop="item.Children.A_Qprop"
                          label="平均流量"
                          align="center"
                          width="160"
                          >
                        </el-table-column>
                        <el-table-column
                          :prop="item.Children.WQprop"
                          label="小时累计水量"
                          align="center"
                          width="160"
                          >
                        </el-table-column> -->
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
    import App from "@/App.vue";
	export default {
        data(){
            return{
                zdlxlist:[
                {
                    value:'1',
                    label:'明渠'
                },
                {
                    value:'2',
                    label:'堰槽'
                },
                {
                    value:'3',
                    label:'渡槽'
                },
                {
                    value:'4',
                    label:'管道'
                },
                ],
                cols1:[],
                cols: [
                    { 
                      label: "站点A", 
                      Children:{
                        A_Zprop:'A_A_Z',
                        A_Qprop:'A_A_Q',
                        WQprop:'A_WQ',
                      },
                    },
                    { 
                      label: "站点B", 
                      Children:{
                        A_Zprop:'B_A_Z',
                        A_Qprop:'B_A_Q',
                        WQprop:'B_WQ',
                      },
                    },{ 
                      label: "站点C", 
                      Children:{
                        A_Zprop:'C_A_Z',
                        A_Qprop:'C_A_Q',
                        WQprop:'C_WQ',
                      },
                    },
                ],
                tableData: [
                    {
                        DT:'19-06-04 10:52:00',
                        A_A_Z:'5.00',
                        A_A_Q:'6.00',
                        A_WQ:'10.000',
                        B_A_Z:'6.00',
                        B_A_Q:'6.00',
                        B_WQ:'11.000',
                        C_A_Z:'7.00',
                        C_A_Q:'6.00',
                        C_WQ:'12.000',
                    },
                    
                ],

                testdata:[],
                testdata2:[],
                form:{
                    adressList:[], 
                    qudaoList:[],
                    model_adress:'',
                    zdlx:'',
                    model_qudao:'',
                    date1:[],
                    date2:[],   
                    searchmsg:'',
                },
                date:'',
                data:[],
                data2:[],
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
            }
        },
        // 引入过滤方法到此组件
        mixins: [FilterMethods,GetDataMethods],
        mounted(){
          var date = new Date(); 
          var Month = date.getMonth()+1;
          var datelist1 = new Array();
          var datelist2 = new Array();
          datelist1[0] = date.getFullYear()+'-'+Month+'-'+date.getDate();
          datelist1[1] = date.getFullYear()+'-'+Month+'-'+date.getDate();
          datelist2[0] = '0';
          datelist2[1] = date.getHours();
          this.form.date1 = datelist1;
          this.form.date2 = datelist2;
          console.log(this.form.date);
          this.Reload(); 
        },
        methods:{
            cellclick(row, column, cell, event){
              var attributes = row;
              var graphic = new Object;
              graphic.attributes = attributes;
              var evt = new Object;
              evt.graphic = graphic;
              var itype = "qudaoshuiqing";
              var v = new Object;
              v.itype = itype;
              this.$App.showDrawer(evt, v);
            },
            timechange(){
              console.log(this.form.date);
              this.Reload();
            },
            Reload(){
                this.loading = true;
                this.axios.get('/guanqu/qudaoshuiqing/xiaoshi?_page_size='+this.list_input.pagesize+'&_page='+this.list_input.current+this.searchs,{params:{DT:'bt,'+this.form.date1[0]+','+this.form.date1[1],TM:'bt,'+this.form.date2[0]+','+this.form.date2[1]}}).then((res)=>{
                    this.loading = false;
                    console.log(res);
                    // this.data = res.data.rows;
                    this.cols1 = res.data.cols;
                    // this.data = res.data.rows;
                    // console.log('tap',this.data[0].val.胜溪支渠站.pingjshuiwei);
                    this.list_input.total = res.data.total;
                    for (var i = 0;i<this.data.length ; i++) {
                        this.data[i].DT = this.data[i].DT+' '+this.data[i].TM+':00';
                        this.data[i].A_Z = this.Z_Filter(this.data[i].A_Z);
                        this.data[i].A_Q = this.Z_Filter(this.data[i].A_Q, 3);
                        this.data[i].WQ = this.Z_Filter(this.data[i].WQ, 3);
                    }
                    //行政区划
                    this.getTableData_WRP_AD_B(data => {
                        this.form.adressList = data;
                    });
                    // 获取输排水渠道数据,然后设置渠道选择框选项
                    this.getTableData_WRP_IrrBTCanalSystem(data => {
                        this.form.qudaoList = data;
                    });
                });
                // this.axios.get('/guanqu/admin/ST_HCanal_C?_page_size=9999'+this.timesearch).then((res)=>{
                //     console.log(res)
                //     this.data2 = res.data.rows;
                //     this.data2.forEach((val, index, array) => {
                //         val.STNM = val.STNM.replace('**','');
                        
                //     })
                // });
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

            //测试
            handleCurrentChange(row, event, column) {
                console.log(row, event, column, event.currentTarget);
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            }


        },
        components: {

        },
        created(){
          console.dir("showDrawer",this.$showDrawer)
        }
    }
</script>

<style type="text/css">
	.tb-edit .el-input {
    display: none;
}

.tb-edit .current-row .el-input {
    display: block;
}

.tb-edit .current-row .el-input + span {
    display: none;
}
</style>