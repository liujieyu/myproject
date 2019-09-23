<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>历史数据</BreadcrumbItem>
            <BreadcrumbItem>雨情信息</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="rb">
          <TabPane label="小时表" name="xsb">
            正在开发中...
          </TabPane>
	        <TabPane label="日表" name="rb">
	        	<Tableday></Tableday>
	        </TabPane>
          <TabPane label="月表" name="yb">
            正在开发中...
          </TabPane>
          <TabPane label="年表" name="nb">
            正在开发中...
          </TabPane>         
          <TabPane label="最大降雨时段统计表" name="zdjysdtjb">
            正在开发中...
          </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import Tableday from '@/table/table-yq/table-day.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
       Tableday
      }
    }
</script>

<style type="text/css">
	
</style>