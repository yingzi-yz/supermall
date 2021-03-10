<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control :titles="['流行', '新款', '精选']" 
                 v-on:tabClick="tabClick" 
                 ref="tabControl1"
                 class="tab-control" v-show="isTabFixed"></tab-control>

    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll" 
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']" 
                   v-on:tabClick="tabClick" 
                   ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import GoodsListItem from 'components/content/goods/GoodsListItem'
  import Scroll from 'components/common/scroll/Scroll'

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import {getHomeMultidata, getHomeGoods} from 'network/home'
  import {debounce} from 'common/utils'
  import {ItemListenerMixin, backTopMixin} from 'common/mixin'

  export default {
    name: "Home",
    components: { 
      NavBar,
      TabControl,
      GoodsList,
      GoodsListItem,
      Scroll,
      HomeSwiper,
      RecommendView,
      FeatureView,
    },
    mixins: [ItemListenerMixin, backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          pop: {page: 0, list: []},
          new: {page: 0, list: []},
          sell: {page: 0, list: []},
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },
    destroyed() {
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
      this.$refs.scroll.refresh();
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY();

      // 取消全局事件的监听
      this.$bus.$off('itemImageLoad', this.itemImgListener);
    },
    created() {
      // 1. 请求多个数据
      this.getHomeMultidata()

      // 2. 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
    },
    methods: {
      // 事件监听相关方法
      tabClick(index) {
        switch(index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      contentScroll(position) {
        // 判断BackTop是否显示
        // this.isShowBackTop = position.y < -1000;
        this.isShowBackTop = (-position.y) > 1000;

        // 决定tabControl是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop;
      },
      loadMore() {
        this.getHomeGoods(this.currentType);
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },

      // 网络请求相关方法
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          // 将数组解析依次添加到另一个数组
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          // 完成上拉加载更多,better-scroll默认只能加载一次
          this.$refs.scroll.finishPullUp();
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    position: relative;
    /* vh是视口单位 */
    height: 100vh;
    padding-top: 44px;
  }

  .home-nav {
    position: fixed;
    top: 0;
    /* 用left和right是为了保持宽度,也可以直接写width: 100% */
    left: 0;
    right: 0;
    z-index: 9;
    background-color: var(--color-tint);
    color: #fff;
  }

  /* .content {
    height: calc(100% - 93px);
    margin-top: 44px;
    overflow: hidden;
  } */

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
