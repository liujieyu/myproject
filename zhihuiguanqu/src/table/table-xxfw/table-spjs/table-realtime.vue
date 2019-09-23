<template>
  <div>
    <Content :style="{padding: '24px', background: '#fff'}">

      <Row :gutter="16">
        <Col :span="span1">
          <Row :gutter="16" type="flex" justify="end" z style="margin: 10px;line-height: 32px;">
        <Col>
          <Button type="primary" style="width: auto;margin-right: 20px;margin-left: 10px;" @click="cellclick">站点详情</Button>
          <Button type="primary" style="width: auto;margin-right: 20px;margin-left: 10px;" @click="err">导出</Button>
          <!-- <Button type="primary" style="width: auto;margin-right: 0px;margin-left: 10px;" @click="test1">显示/隐藏树形</Button> -->
        </Col>
      </Row>
      <div class="switch" @click="Menu_toggle">
        <i class="el-icon-d-arrow-left" v-if="Menu.show_Controller"></i>
        <i class="el-icon-d-arrow-right" v-if="!Menu.show_Controller"></i>
      </div>
      <Divider/>
      <Row>
            <Col style="text-align: center;margin: 0 0 10px 0;">
                监测站名：<a href="#" @click="cellclick">{{CZMC}}</a>
            </Col>
            <Col>
              关联的监测要素：流量 10m³/sm&nbsp;&nbsp;&nbsp;水位 1.5m&nbsp;&nbsp;&nbsp;闸门开度 1m
            </Col>
            <Col style="margin-top: 5px;margin-bottom: 5px;">
              关联的站点：
              <el-button size="mini" round>A站点</el-button>
              <el-button size="mini" round>B站点</el-button>
              <el-button size="mini" round>C站点</el-button>
            </Col>
        </Row>
      <Row :gutter="16" style="">
        <Col>
          <div style="height: 500px;border: 1px solid red;">
            <p style="text-align: center;margin-top: 20px;">视频监控主界面</p>
            <p style="text-align: center;margin-top: 20%;">正在开发中...</p>
          </div>
        </Col>
      </Row>
        </Col>
        <transition name="el-fade-in-linear">
            <Col :span="span2" v-show="show1">
              <Row style="margin-top: 10px;line-height: 32px;">
                <Col>
                  <Input search enter-button suffix="ios-search" placeholder="请输入站名" style="width: auto;margin-right: 20px;" @on-search="search" v-model="searchmsg" />
                </Col>
              </Row>
              <Row style="margin-top: 30px;margin-left: 20px;">
                <Col style="max-height: 600px;overflow-y: auto;">
                  <Button shape="circle" @click="changeTree">切换树形图</Button>
                  <el-tree
                    class="filter-tree"
                    :data="Treedata2"

                    :filter-node-method="filterNode"
                    v-if="xingzhengquhua"
                    @node-click="xingzheng_tree"
                    ref="tree">
                  </el-tree>
                  <el-tree
                    class="filter-tree"
                    :data="Treedata"

                    :filter-node-method="filterNode"
                    v-if="qudao"
                    @node-click="qudao_tree"
                    ref="tree">
                  </el-tree>
                </Col>
              </Row>
            </Col>
        </transition>
      </Row>

      
    </Content>
  </div>
</template>

<script type="text/javascript">
import FilterMethods from "@/assets/commonJS/FilterMethods";
import GetDataMethods from "@/assets/commonJS/GetDataMethods";
import App from "@/App.vue";
export default {
  data() {
    return {
      loading: false,
      qudao: true,
      xingzhengquhua: false,
      show1:true,
      Menu: { show_Controller: false },
      span1:'19',
      span2:'5',
      Treedata: [
        {
          title: "xxx灌区",
          expand: true,
          children: [
            {
              title: "xxx渠道",
              expand: true,
              children: [
                {
                  title: "站点A"
                },
                {
                  title: "站点B"
                }
              ]
            },
            {
              title: "xxx渠道",

              children: [
                {
                  title: "站点C"
                }
              ]
            },
            {
              title: "xxx渠道",

              children: [
                {
                  title: "站点D"
                }
              ]
            }
          ]
        }
      ],
      Treedata2: [],
      GD:'',
      data1: [],
      date:'',
      searchs:"&STNM=南干渠分水口",
      timesearch:'',
      CZMC:'',
      echarts:{
        TM:[],
        VOL:[],
      },
      form:{
        searchmsg:'',
        date:'',
      },
      searchmsg:'',
      MaxY:0,
      MinY:0,
      ZCDY:{},
      item:{},
      list_input: {
        total: 100,
        pagesize: 50,
        pagesizeopts: [10, 20, 50, 75, 100, 200],
        current: 1
      }
    };
  },
  // 引入过滤方法到此组件
  mixins: [FilterMethods, GetDataMethods],
    watch: {
    searchmsg(val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted() {
    var date = new Date(); 
    var Month = date.getMonth()+1;
    var datelist = new Array();
    datelist[0] = date.getFullYear()+'-'+Month+'-'+date.getDate()+' 00:00:00.000';
    datelist[1] = date.getFullYear()+'-'+Month+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+'.000';
    this.form.date = datelist;
    console.log(this.form.date);
    this.Reload();
  },
  methods: {
    Menu_toggle() {
      this.Menu.show_Controller = !this.Menu.show_Controller;
      this.show1 = !this.show1;
      if (this.show1 == true ) {
        this.span1 = '19';
        this.span2 = '5';
        this.data2 = {};
        this.Reload();
      }else{
        this.span1 = '24';
        this.span2 = '0';
        this.data2 = {};
        this.Reload();
      }
    },
    test1() {
      this.show1 = !this.show1;
      if (this.show1 == true ) {
        this.span1 = '19';
        this.span2 = '5';
        this.data2 = {};
        this.Reload();
      }else{
        this.span1 = '24';
        this.span2 = '0';
        this.data2 = {};
        this.Reload();
      }
      console.log(123);
    },
    qudao_tree(data){
      console.log(data);
      if (data.bj == 0) {
        this.searchs = '&STNM=like,'+data.label;
        this.STinfo = data;
        this.Reload();
        this.CZMC = data.label;
      }
    },
    xingzheng_tree(data){
      console.log(data);
      if (data.bj == 0) {
        this.searchs = '&STNM=like,'+data.label;
        this.STinfo = data;
        this.Reload();
        this.CZMC = data.label;
      }
    },
    filterNode(value, Treedata ,node) {
      this.filterTreeData.push(node);
      if (!value) return true;
      return Treedata.label.indexOf(value) !== -1;
    },
    search(){
      // console.log(this.searchmsg);
      this.filterTreeData = [];
      this.$refs.tree.filter(this.searchmsg);

      // console.log("filterTreeData",this.filterTreeData)
      
      if (this.searchmsg != '') {
        this.filterTreeData.some((val, index) => {
        // console.log(val.expanded,val.data.bj)
        if (val.visible && val.data.bj == 0) {
          // console.log(val);
          this.searchs = `&STNM=like,${val.label}`;
          this.CZMC = val.label;
          console.log("this.searchmsg",this.searchmsg)
          return true;
        }
      })
        this.Reload();
      }else{
        this.searchs = '';
        this.Reload();
      }
    },
    cellclick(){
              var evt = new Object();
              evt.graphic = new Object();
              evt.graphic.attributes = this.data1[0];
              evt.graphic.attributes.itype = "shipin";
              evt.graphic.attributes.rowinfo = JSON.parse(JSON.stringify(this.data1[0]))
              evt.graphic.attributes.rowinfo.tableType = {
                // sp: "historyTable"
              };
              var v = new Object;
              v.itype = "shipin";
              console.log("evt",evt);
              this.$App.showDrawer(evt, v);
    },
    err(){
      this.$Message.warning('该功能还在开发中...');
    },
    changeTree() {
      this.qudao = !this.qudao;
      this.xingzhengquhua = !this.xingzhengquhua;
    },
    Reload() {
      this.loading = true;
      this.axios.get("/guanqu/admin/ST_MOVIE_R?_page_size=" +this.list_input.pagesize +"&_page=" +this.list_input.current+this.searchs).then(res => {
          console.log(res);
          this.data1 = res.data.rows;
          if (res.data.total != 0) {
            this.CZMC = res.data.rows[0].STNM;
          }
          this.list_input.total = res.data.total;
          this.loading = false;
        });
      
    },
    indexMethod(index){
        return index + 1 + (this.list_input.pagesize*(this.list_input.current-1));
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
    }
  },
  created() {
    this.axios.get("/guanqu/table/xingzhen_tree?type=8").then(res =>{
      this.Treedata2 = this.XingZheng_Tree_Filter('430100000000',res.data);
    });
    // 获取输排水渠道数据,然后设置渠道选择框选项
    this.axios.get("/guanqu/table/qudao_tree?type=8").then(res =>{
      this.Treedata = this.QuDao_Tree_Filter(res.data);
    });
  }
};
</script>

<style type="text/css" lang="less">
.switch{
  position: absolute;
  right: 0;
  top: 0;
  height: 55px;
  display: flex;
  align-items: center;
  background: white;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border: #7eb7f0 2px solid;
  border-right: 0;
}
</style>