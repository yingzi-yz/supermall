<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" ref="nav" @titleClick="titleClick"/>
    
    <scroll class="content" ref="scroll" 
            :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :paramInfo="paramInfo"/>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
      <detail-recommend-info ref="recommend" :recommendList="recommendList"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addToCart"/>
    <!-- <toast :message="message" :show="show"/> -->
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailRecommendInfo from './childComps/DetailRecommendInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  // import Toast from 'components/common/toast/Toast'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
  import {debounce} from 'common/utils'
  import {ItemListenerMixin, backTopMixin} from 'common/mixin'

  import {mapActions} from 'vuex'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailRecommendInfo,
      DetailBottomBar,
      Scroll,
      // Toast
    },
    mixins: [ItemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommendList: [],
        themeTopYs: [],
        currentIndex: 0,
        // message: '',
        // show: false
      }
    },
    created() {
      // 保存存入的iid
      this.iid = this.$route.params.iid;

      // 根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.result;

        // 获取顶部的图片轮播数据
        this.topImages = data.itemInfo.topImages;
      
        // 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

        // 获取商家信息
        this.shop = new Shop(data.shopInfo);

        // 获取商品详细信息
        this.detailInfo = data.detailInfo;

        // 获取商品参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
      
        // 获取评论信息
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }
        
        // 判断dom是否被渲染出来
        // this.$nextTick(() => {})
      })

      // 请求推荐数据
      getRecommend().then((res, error) => {
        if (error) return;
        this.recommendList = res.data.list;
      })
    },
    mounted() {
    },
    updated() {
    },
    destoryed() {
      this.$bus.$off('itemImageLoad', this.itemImgListener);
    },
    methods: {
      ...mapActions(['addCart']),
      imageLoad() {
        this.$refs.scroll.refresh();

        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        // 方法一不需要加这个,方法二才需要
        this.themeTopYs.push(Number.MAX_VALUE);

        // 这个是因为滚动到某个位置的内容会被导航条部分挡住,所以需要再向下滚44px
        for (var j = 0 ; j < this.themeTopYs.length - 1; j++) {
          this.themeTopYs[j] = this.themeTopYs[j] - 44;
        }
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
      },
      contentScroll(position) {
        // 获取y值
        const positionY = -position.y;

        // positionY和detail值进行对比
        let length = this.themeTopYs.length;
        // 方法一
        // for (let i = 0; i < length; i++) {
        //   if (this.currentIndex !== i
        //      && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) 
        //      || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
        //     this.currentIndex = i;
        //     this.$refs.nav.currentIndex = this.currentIndex;
        //   }
        // }

        // 方法二
        for (let i = 0; i < length - 1; i++) {
          if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }

        // 判断BackTop是否显示
        this.isShowBackTop = position.y < -1000;
      },
      addToCart() {
        // 获取购物车需要展示的商品信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        
        // 将商品添加到购物车中
        // 第一种方法
        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res);
        // })
        // 第二种方法 (把actions映射出来然后可以直接调用)
        this.addCart(product).then(res => {
          // this.show = true;
          // this.message = res;
          // setTimeout(() => {
          //   this.show = false;
          //   this.message = '';
          // }, 1500)

          this.$toast.show(res, 2000);
        })
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }
</style>