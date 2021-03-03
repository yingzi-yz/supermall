module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // @等同于src
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}