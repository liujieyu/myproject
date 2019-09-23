<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>历史数据</BreadcrumbItem>
            <BreadcrumbItem>渠道水情</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="hour"> 
	        <TabPane label="小时表" name="hour">
	        	<Tablehour></Tablehour>
	        </TabPane>
	        <TabPane label="日表" name="day">
	        	<Tableday></Tableday>
	        </TabPane>
	        <TabPane label="月表" name="month">
	        	<Tablemonth></Tablemonth>
	        </TabPane>
	        <TabPane label="历史表" name="history">
	        	<Tablehistory></Tablehistory>
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
	import Tablehour from '@/table/table-qdsq/table-hour.vue'
	import Tableday from '@/table/table-qdsq/table-day.vue'
	import Tablemonth from '@/table/table-qdsq/table-month.vue'
	import Tablehistory from '@/table/table-qdsq/table-history.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
        Tablehour,
        Tableday,
        Tablemonth,
        Tablehistory
      }
    }
</script>

<style type="text/css">
	
</style>