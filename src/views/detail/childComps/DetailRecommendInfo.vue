<template>
  <div class="recommend-info">
    <div class="info-header">热门推荐</div>
    <grid-view>
      <goods-list-item v-for="(item, index) in recommendList" :key="index" :goodsItem="item"/>
    </grid-view>
  </div>
</template>

<script>
  import GridView from 'components/common/gridView/GridView'
  import GoodsListItem from 'components/content/goods/GoodsListItem'

  export default {
    name: 'DetailRecommendInfo',
    components: {
      GridView,
      GoodsListItem,
    },
    props: {
      recommendList: {
        type: Array,
        default() {
          return []
        }
      }
    },
  }
</script>

<style scoped>
  .info-header {
    padding-left: 8px;
    line-height: 36px;
    font-size: 15px;
    color: #333;
  }
</style>