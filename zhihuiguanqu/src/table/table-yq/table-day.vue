<template>
	<div>
		<Content class="searchcon">
      <Row type="flex" :gutter="16" class="rowtocol">
                        <Col>
                        时间:
                            <el-date-picker unlink-panels 
                              class="bigWidth"
                              :disabled="isDisabled"
                              v-model.trim="form.time"
                              type="daterange"
                              value-format="timestamp"
                              range-separator="至"
                              start-placeholder="开始时间"
                              end-placeholder="结束时间"
                            ></el-date-picker>
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
                              change-on-select
                            ></el-cascader>
                        </Col>
                        <Col>
                            降雨量:
                            <Select v-model="form.jyl" style="width:120px;margin-left: 5px;" clearable>
                                <Option></Option>
                            </Select>
                        </Col>
                        <Col>
                        <!-- 站名模糊搜索 -->
                            <Input search enter-button suffix="ios-search" placeholder="请输入站名" style="width: auto;margin-right: 20px;" v-model="form.searchmsg" />
                        </Col>
                        <Col> 
                            <Button type="primary" >综合报表</Button>
                        </Col>
                        <Col> 
                            <Button type="primary" >导出</Button>
                        </Col>
                    </Row>
                    <Divider />
                     <el-table
                        :data="data"
                        border
                        height="480"
                        v-loading="loading"
                        style="width: 100%"
                        @cell-click="cellclick"
                        @sort-change="sort_change"
                        >
                        <el-table-column
                          prop="ID" 
                          label="ID"
                          align="center"
                          min-width="6%"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="STNM"
                          label="站名"
                          align="center"
                          sortable
                          min-width="20%"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="STCD"
                          label="站点编码"
                          align="center"
                          sortable
                          min-width="20%"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="DT"
                          label="日期"
                          align="center"
                          min-width="18%"
                          sortable
                          >
                        </el-table-column>
                        <el-table-column
                          prop="TM"
                          label="时间"
                          align="center"
                          min-width="18%"
                          sortable
                          >
                        </el-table-column>
                        <el-table-column
                          prop="P"
                          label="降雨量"
                          align="center"
                          min-width="18%"
                          sortable
                          >
                        </el-table-column>
                      </el-table>
                    <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <Page :total="100" :current="1"></Page>
                        </div>
                    </div>
                </Content>
	</div>
</template>

<script type="text/javascript">
	export default {
        data(){
            return{
                loading:false,
                data:[],
                form:{
                    adressList:[], 
                    qudaoList:[],
                    model_adress:'',
                    jyl:'',
                    model_qudao:'',
                    time:'',   
                    searchmsg:'',
                    xzqh:'',
                    qd:'',
                    field:'',
                },
            }
        },
        mounted(){
            this.Reload();
        },
        methods:{
            Reload(){
                this.loading = true;
                this.axios.get('/table_war_exploded/testroot/raininfo/30',{params:{}}).then((res)=>{
                    var tt=res.data;
                    this.loading = false;
                    this.data.push(tt);
                });
                //行政区划
                this.getTableData_WRP_AD_B(data => {
                    this.form.adressList = data;
                });
                // 获取输排水渠道数据,然后设置渠道选择框选项
                this.getTableData_WRP_IrrBTCanalSystem(data => {
                    this.form.qudaoList = data;
                });
            }
        }
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