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
                            工程规模:
                            <Select v-model="model1" style="width:120px;margin-left: 5px;margin-right: 20px;">
                                <Option v-for="item in shiList" :value="item.value" :key="item">{{ item }}</Option>
                            </Select>
                        </Col>
                        <Col>
                            归属部门:
                            <Select v-model="model1" style="width:120px;margin-left: 5px;margin-right: 20px;">
                                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </Col>
                        <Col> 
                            <Button type="primary" style="width: auto;margin-right: 20px;" @click="err">导出</Button>
                        </Col>
                        <Col>
                        <!-- 站名模糊搜索 -->
                            <Input search enter-button suffix="ios-search" placeholder="请输入水库名称" style="width: auto;margin-right: 10px;" @on-search="search" v-model="form.searchmsg" />
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
                          prop="RSNM"
                          label="水库名称"
                          align="center"
                          fixed="left"
                          width="150">
                        </el-table-column>
                        <el-table-column
                          prop="PRSC"
                          label="工程规模"
                          align="center"
                          width="">
                        </el-table-column>
                        <el-table-column
                          prop="TTSTCP"
                          label="总库容(万m³)"
                          align="center"
                          width="120"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="FLCNSTCP"
                          label="防洪库容(万m³)"
                          align="center"
                          width="120"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="MJFLSSCNWL"
                          label="汛限水位(m)"
                          align="center"
                          width="120"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="NRSTLV"
                          label="正常蓄水位(m)"
                          align="center"
                          width="150"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="CHFLLV"
                          label="校核洪水位(m)"
                          align="center"
                          width="150"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="BLSYS"
                          label="归属部门"
                          align="center"
                          width="120"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="ADDVCD"
                          label="所在行政区划"
                          align="center"
                          width="120"
                          >
                        </el-table-column>
                        <!-- <el-table-column
                          prop="Canal_Length"
                          label="归属灌区"
                          align="center"
                          width="120"
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
                this.axios.get('/guanqu/admin/WRP_RSR_BSIN?_page_size='+this.list_input.pagesize+'&_page='+this.list_input.current).then((res)=>{
                    console.log(res);
                    this.loading = false;
                    this.data = res.data.rows;
                    this.list_input.total = res.data.total;
                    for (var i = 0;i<this.data.length ; i++) {
                        

                    }
                });
                //行政区划
                this.getTableData_WRP_AD_B(data => {
                    this.form.adressList = data;
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