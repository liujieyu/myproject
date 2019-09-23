<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>预警管理</BreadcrumbItem>
            <BreadcrumbItem>站点预警</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="warmsite">
	        <TabPane label="站点预警" name="warmsite">

	        	<WarmSite></WarmSite>
                
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import WarmSite from '@/warm/warm-manage/warm-siteinfo/siteinfo.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
        WarmSite,
        
      }
    }
</script>

<style type="text/css">
	
</style>