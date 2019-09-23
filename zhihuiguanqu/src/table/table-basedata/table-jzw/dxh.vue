<template>
	<div>
		<Content :style="{padding: '24px', background: '#fff'}">
                    <Row type="flex" :gutter="16" justify="end">
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
                            <!-- <Button type="primary" @click="err" style="width: auto;margin-right: 20px;">打印</Button> -->
                        </Col>
                        <Col>
                        <!-- 站名模糊搜索 -->
                            <Input search enter-button suffix="ios-search" placeholder="请输入倒吸虹名称" style="width: auto;margin-right: 10px;" @on-search="search" v-model="form.searchmsg" />
                        </Col>
                    </Row>
                    <Row type="flex" style="margin: 10px 0 10px 0;" :gutter="16" justify="end">
                        <Col>
                            类型:
                            <Select v-model="model1" style="width:120px;margin-left: 5px;margin-right: 20px;">
                                <Option v-for="item in shiList" :value="item.value" :key="item">{{ item }}</Option>
                            </Select>
                        </Col>
                        <Col>
                            结构布置形式:
                            <Select v-model="model1" style="width:120px;margin-left: 5px;margin-right: 20px;">
                                <Option v-for="item in shiList" :value="item.value" :key="item">{{ item }}</Option>
                            </Select>
                        </Col>
                        <Col>
                            样式:
                            <Select v-model="model1" style="width:120px;margin-left: 5px;margin-right: 0px;">
                                <Option v-for="item in shiList" :value="item.value" :key="item">{{ item }}</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Divider />
                    <el-table
                        :data="data"
                        border
                        height="480"
                        v-loading="loading"
                        style="width: 100%"
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
                          prop="I_Siphon_Name"
                          label="倒虹吸名称"
                          align="center"
                          fixed="left"
                          width="150">
                        </el-table-column>
                        <el-table-column
                          prop="I_Siphon_Type"
                          label="倒虹吸类型"
                          align="center"
                          width="150">
                        </el-table-column>
                        <el-table-column
                          prop="Structure_Type"
                          label="结构布置形式"
                          align="center"
                          width="150">
                        </el-table-column>
                        <el-table-column
                          prop="Style"
                          label="样式"
                          align="center"
                          width="120"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Design_Flux"
                          label="设计流量(m³/s)"
                          align="center"
                          width="160"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Check_Flux"
                          label="校核流量(m³/s)"
                          align="center"
                          width="160"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="I_Length"
                          label="内径长度(m)"
                          align="center"
                          width="160"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="DIAMETER"
                          label="管径(m)"
                          align="center"
                          width="160"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="IN_Z"
                          label="入口水位(m)"
                          align="center"
                          width="160"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="OUT_Z"
                          label="出口水位(m)"
                          align="center"
                          width="160"
                          >
                        </el-table-column>
                        <el-table-column
                          prop=""
                          label="所在渠道"
                          align="center"
                          width="160"
                          >
                        </el-table-column>
                        <!-- <el-table-column
                          prop="ACIRAR"
                          label="出口水位"
                          align="center"
                          width="160"
                          >
                        </el-table-column> -->
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
                date:'',
                data:[],
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
            err(){
              // console.log("showDrawer",this.$showDrawer);
                this.$Message.warning('该功能还在开发中...');
            },
            search(){
              if (this.form.searchmsg != '') {
                this.searchs = '&STNM=like,'+this.form.searchmsg;
              }else{
                this.searchs = '';
              }
                this.Reload(); 
            },
            indexMethod(index){
                return index + 1 + (this.list_input.pagesize*(this.list_input.current-1));
            },
            timechange(date){
                console.log(date);
                this.date = date;
            },
            Reload(){
                this.loading = true;
                this.axios.get('/guanqu/admin/WRP_IrrBTInvertedsiphon?_page_size='+this.list_input.pagesize+'&_page='+this.list_input.current).then((res)=>{
                    console.log(res);
                    this.loading = false;
                    this.data = res.data.rows;
                    this.list_input.total = res.data.total;
                    for (var i = 0;i<this.data.length ; i++) {
                      this.data[i].Design_Flux = this.Z_Filter(this.data[i].Design_Flux,3);
                      this.data[i].Check_Flux = this.Z_Filter(this.data[i].Check_Flux,3);
                      this.data[i].IN_Z = this.Z_Filter(this.data[i].IN_Z);
                      this.data[i].OUT_Z = this.Z_Filter(this.data[i].OUT_Z);
                      this.data[i].DIAMETER = this.Z_Filter(this.data[i].DIAMETER);
                    }
                });
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