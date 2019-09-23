<template>
	<div>
		<Content :style="{padding: '24px', background: '#fff'}">
                    <Row type="flex" :gutter="16" justify="end">
                        <Col>
                            行政区划:
                            <!-- 地址级联选择器 -->
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
                            <!-- 渠道级联选择器 -->
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
                            国家定类:
                            <Select v-model="model1" style="width:120px;margin-left: 5px;margin-right: 20px;">
                                <Option v-for="item in shiList" :value="item.value" :key="item">{{ item }}</Option>
                            </Select>
                        </Col>
                        <Col>
                            站点等级:
                            <Select v-model="model1" style="width:120px;margin-left: 5px;margin-right: 20px;">
                                <Option v-for="item in shiList" :value="item.value" :key="item">{{ item }}</Option>
                            </Select>
                        </Col>
                        <Col>
                            监测要素:
                            <Select v-model="model1" style="width:120px;margin-left: 5px;margin-right: 0px;">
                                <Option v-for="item in shiList" :value="item.value" :key="item">{{ item }}</Option>
                            </Select>
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
                        >
                        <el-table-column
                          label=" "
                          type="index"
                          align="center"
                          width="65"
                          fixed="left"
                          :index="indexMethod">
                        </el-table-column>
                        <el-table-column
                          prop="STNM"
                          label="站名"
                          align="center"
                          fixed="left"
                          width="150">
                        </el-table-column>
                        <el-table-column
                          prop="STTP"
                          label="国家定类"
                          align="center"
                          width="100">
                        </el-table-column>
                        <el-table-column
                          prop="STGR"
                          label="等级"
                          align="center"
                          width="240"
                          >
                        </el-table-column>
                        <el-table-column
                          prop=""
                          label="监测要素"
                          align="center"
                          width="240"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="ESSTDT"
                          label="建站日期"
                          align="center"
                          width="240"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="DLOG"
                          label="建设单位"
                          align="center"
                          width="240"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="MNUN"
                          label="管理单位"
                          align="center"
                          width="240"
                          >
                        </el-table-column>
                        <el-table-column
                          prop=""
                          label="所在行政区划"
                          align="center"
                          width="240"
                          >
                        </el-table-column>
                        <el-table-column
                          prop=""
                          label="所在灌区渠道"
                          align="center"
                          width="240"
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
	export default {
        data(){
            return{
                loading:false,
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
        mixins: [FilterMethods,GetDataMethods],
        mounted(){
            this.Reload();
        },
        methods:{
            timechange(date){
                console.log(date);
                this.date = date;
            },
            Reload(){
                this.loading = true;
                this.axios.get('/guanqu/admin/ST_STBPRP_B?_page_size='+this.list_input.pagesize+'&_page='+this.list_input.current).then((res)=>{
                    console.log(res);
                    this.loading = false;
                    this.data = res.data.rows;
                    this.list_input.total = res.data.total;
                    for (var i = 0;i<this.data.length ; i++) {
                        if (this.data[i].DA_Z == '.000') {
                            this.data[i].DA_Z = '-';
                        }else{
                            this.data[i].DA_Z = '0'+this.data[i].DA_Z;
                        }
                        this.data[i].DA_Q = '0'+this.data[i].DA_Q;

                    }
                });
                //行政区划
                this.getTableData_WRP_AD_B(data => {
                    this.form.adressList = data;
                });
                // 获取输排水渠道数据,然后设置渠道选择框选项
                this.getTableData_WRP_IrrBTCanalSystem(data => {
                    this.form.qudaoList = data;
                });
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
	
</style>