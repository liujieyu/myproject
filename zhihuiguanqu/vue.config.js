module.exports = {
    baseUrl: '',
    productionSourceMap: false,
    devServer: {
      
    	proxy: {
        '/table_war_exploded':{
          target: 'http://localhost:8080/'
      },
        '':{
          target: 'http://v3.yingmen.vip/'
        }
    }
  }
}
  