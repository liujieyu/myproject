<template>
	<div>
		<Content :style="{padding: '24px', background: '#fff'}">
                    <Row type="flex" :gutter="16" justify="end">
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
                        <Col>
                        <!-- 站名模糊搜索 -->
                            <Input search enter-button suffix="ios-search" placeholder="请输入站名" style="width: auto;margin-right: 20px;" @on-search="search" v-model="form.searchmsg" />
                        </Col>
                        <Col> 
                            <Button type="primary" style="width: auto;margin-right: 20px;" @click="err">导出</Button>
                        </Col>
                    </Row>
                    <!-- <Row type="flex" style="margin: 10px;" :gutter="16" justify="end">
                        <Col>
                            行政区划:

                            <el-cascader
                              clearable
                              size="mini"
                              placeholder="请选择地址"
                              :options="form.adressList"
                              v-model="form.model_adress"
                              @change="XZQHsearch"
                              change-on-select
                            ></el-cascader>
                        </Col>
                        <Col>
                            渠道:

                            <el-cascader
                              clearable
                              size="mini"
                              placeholder="请选择渠道"
                              :options="form.qudaoList"
                              v-model="form.model_qudao"
                              @change="QDsearch"
                              change-on-select
                            ></el-cascader>
                        </Col>
                    </Row> -->
                    <Divider />
                    <Row style="font-size: 16px;">
                        <Col style="text-align: center;margin: 0 0 10px 0;">
                           共个{{STNMSlength}}站点,今日收到图像站数{{STNMSlength}},今日未收到图像站数{{STNMSlength-STNMSlength}}
                        </Col>
                    </Row>
                    <Row type="flex" style="flex-wrap:wrap;" :gutter="24" v-loading="loading">
                        <Col span="6" v-for="(item,index) in data" style="margin-top: 20px;">
                            <Card>
                                <div slot="title">
                                    <img :src="item.Image ? item.Image : require('@/assets/image/shuizha.jpg')" style="width: 100%;cursor:pointer" @click="fangda(data,index)">
                                </div>
                                <p><a href="#" @click="gobox(item)">{{item.STNM}}</a> {{item.TM}}</p>
                                <p>{{item.MEMO}}</p>
                                <br>
                                <p v-if="item.Q">流量:{{item.Q}}</p>
                                <p v-if="item.UPZ">闸阀上水位:{{item.UPZ}}</p>
                                <p v-if="item.DWZ">闸阀下水位:{{item.DWZ}}</p>
                            </Card>
                        </Col>
                    </Row>
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
	export default {
        data(){
            return{
                loading:false,
                list_input:{
                    total:100,
                    pagesize:48,
                    pagesizeopts:[10,20,48,75,100,200],
                    current:1,
                },
                form:{
                    adressList:[], 
                    qudaoList:[],
                    model_adress:'',
                    zdlx:'',
                    model_qudao:'',
                    date:'',   
                    searchmsg:'',
                    xzqh:'',
                    qd:'',
                },
                timesearch:'',
                data:[],
                searchs:'',
                STNMSlength:0,
                STNMlength:0,
            }
        },
        // 引入过滤方法到此组件
        mixins: [FilterMethods,GetDataMethods],
        mounted(){
            var date = new Date(); 
            var Month = date.getMonth()+1;
            if (Month<10) {
                Month = '0'+ Month;
            }
            var Hours = date.getHours()-1;
            var TM = new Array();
            TM[0] = date.getFullYear()+'-'+Month+'-'+date.getDate()+' '+Hours+':00:00.000';
            TM[1] = date.getFullYear()+'-'+Month+'-'+date.getDate()+' '+date.getHours()+':00:00.000';
            console.log(TM);
            this.form.date = TM;
            this.Reload();
        },
        methods:{
            fangda(data,index){
              data = data.map((val)=>{
                val.url = val.Image;
                return val;
              });
              // console.log(item);
              this.$App.enlarge_img(data,index);
            },
            gobox(item){
                console.log(item);
              var evt = new Object();
              evt.graphic = new Object();
              evt.graphic.attributes = item;
              evt.graphic.attributes.itype = "tuxiang";
              evt.graphic.attributes.rowinfo = JSON.parse(JSON.stringify(item))
              // evt.graphic.attributes.rowinfo.tableType = {
              //   tx: "historyTable"
              // };
              var v = new Object;
              v.itype = "tuxiang";
              console.log("evt",evt);
              this.$App.showDrawer(evt, v);
            },
            search(){
                if (this.form.searchmsg=='') {
                    this.searchs = '';
                }else{
                    this.searchs = '&STNM=like,' + this.form.searchmsg;
                }
                this.Reload();
            },
            XZQHsearch(){
              console.log(this.form.model_adress);
              this.Reload();
            },
            QDsearch(){
              console.log(this.form.model_qudao);
              this.Reload();
            },
            Reload(){
                this.loading = true;
                if (this.form.model_adress.length == 0) {
                  this.form.xzqh = ''; 
                }
                if (this.form.model_adress.length == 1) {
                  var str1 = this.form.model_adress[0];
                  str1 = str1.substring(0,6);
                  this.form.xzqh = 'like,'+str1; 
                }
                if (this.form.model_adress.length == 2) {
                  var str2 = this.form.model_adress[1];
                  str2 = str2.substring(0,9);
                  this.form.xzqh = 'like,'+str2; 
                }
                if (this.form.model_adress.length == 3) {
                  var str3 = this.form.model_adress[2];
                  str3 = str3.substring(0,12);
                  this.form.xzqh = str3; 
                }
                if (this.form.model_qudao.length == 0) {
                  this.form.qd = ''; 
                }
                if (this.form.model_qudao.length == 1) {
                  var str4 = this.form.model_qudao[0];
                  str4 = str4.substring(0,5);
                  this.form.qd = 'like,'+str4; 
                }
                if (this.form.model_qudao.length == 2) {
                  var str5 = this.form.model_qudao[1];
                  str5 = str5.substring(0,9);
                  this.form.qd = 'like,'+str5; 
                } 
                this.axios.get('/guanqu/table/ST_JPG_H?_page_size='+this.list_input.pagesize+'&_page='+this.list_input.current+this.searchs,{params:{ADDVCD:this.form.xzqh,Canal_Code:this.form.qd}}).then((res)=>{
                    this.loading = false;
                    // this.data = res.data.rows;
                    // this.list_input.total = res.data.total;
                    // this.STNMlength = res.data.total;
                    // for (var i = 0;i<this.data.length ; i++) {
                    //     this.data[i].TM = this.data[i].TM.replace('.000','').replace('20','');
                    // }
                    // this.data.forEach((val, index, array) => {
                    //     var Image = 'http://v3.yingmen.vip/guanqu/gis/pic_content?id='+val.STCD;
                    //     val.Image = Image;
                    // });
                    //行政区划
                    this.getTableData_WRP_AD_B(data => {
                        this.form.adressList = data;
                    });
                    // 获取输排水渠道数据,然后设置渠道选择框选项
                    this.getTableData_WRP_IrrBTCanalSystem(data => {
                        this.form.qudaoList = data;
                    });
                });
                 this.axios.get('/guanqu/table/ST_JPG_R').then((res)=>{
                    this.data = res.data.rows;
                    this.STNMSlength = res.data.total;
                    this.list_input.total = res.data.total;
                    for (var i = 0;i<this.data.length; i++) {
                        this.data[i].TM = this.data[i].TM.replace('.000','').replace('20','');
                    }
                    this.data.forEach((val, index, array) => {
                        var Image = 'http://v3.yingmen.vip/guanqu/gis/pic_content?id='+val.STCD;
                        val.Image = Image;
                    });
                 });
            },
            err(){
                this.$Message.warning('该功能还在开发中...');
            },
            // 处理页码切换
            CurrentChange(index) {
                // console.log(index);
              this.list_input.current = index;
              this.Reload();
            },
            // 处理每页显示条数切换
            PagesizeChange(pagesize) {
                // console.log(pagesize)
              this.list_input.pagesize = pagesize;
              this.Reload();
            },
        },
    }
</script>

<style type="text/css">
	.ivu-card-head{
        padding: 0;
        border-bottom:0;
    }
</style>