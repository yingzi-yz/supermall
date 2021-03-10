<template>
  <div id="shop-item" @click="checkClick">
    <div class="item-selector">
      <check-button :is-checked="product.checked"/>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">{{product.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{product.price}}</div>
        <div class="item-count right">x{{product.count}}</div>
      </div>
    </div>
  </div>
</template>
  
<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  export default {
    name: 'CartListItem',
    components: {
      CheckButton
    },
    props: {
      product: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      checkClick() {
        this.product.checked = !this.product.checked;
      }
    }
  }
</script>

<style scoped>
  #shop-item {
    display: flex;
    width: 100%;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    display: flex;
    /* width: 20px; */
    justify-content: center;
    align-items: center;
  }

  .item-img {
    padding: 5px;
  }

  .item-img img {
    width: 80px;
    height: 100px;
    border-radius: 5px;
  }

  .item-info {
    position: relative;
    padding: 5px 10px;
    font-size: 17px;
    color: #333;
    overflow: hidden;
  }

  .item-title, .item-desc {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .item-info .item-desc {
    margin-top: 15px;
    font-size: 14px;
    color: #666;
  }

  .info-bottom {
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    margin-top: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }
</style>