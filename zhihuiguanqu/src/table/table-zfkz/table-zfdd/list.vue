<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>历史数据</BreadcrumbItem>
            <BreadcrumbItem>闸阀状态</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="zfdd">
	        <TabPane label="历史" name="zfdd">
	        	<Tablehistory></Tablehistory>
	        </TabPane>
          <TabPane label="时长统计" name="sctj">
            正在开发中...
          </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import Tablehistory from '@/table/table-zfzt/table-history.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
        Tablehistory
      }
    }
</script>

<style type="text/css">
	
</style>