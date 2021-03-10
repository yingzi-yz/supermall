<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span v-if="goods.oldPrice" class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailBaseInfo',
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .base-info {
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
    margin-bottom: 20px;
  }

  .info-title {
    color: #222
  }

  .info-price {
    margin-top: 10px;
  }

  .info-price .n-price {
    font-size: 24px;
    color: var(--color-high-text);
  }

  .info-price .o-price {
    position: relative;
    top: -3px;
    font-size: 13px;
    padding: 2px 5px;
    margin-left: 5px;
    color: #101010;
    background-color: var(--color-high-text);
    border-radius: 8px;
    text-decoration: line-through;
  }

  .discount {
    float: right;
    margin-top: 5px;
  }

  .info-other {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    line-height: 30px;
    font-size: 13px;
    border-bottom: 1px solid rgba(0, 0, 0, .2);
  }

  .info-service {
    display: flex;
    justify-content: space-between;
    /* line-height: 60px; */
    margin: 8px 0;
  }

  .info-service-item img {
    position: relative;
    top: 2px;
    width: 14px;
    height: 14px;
  }

  .info-service-item span {
    margin-left: 5px;
    font-size: 13px;
    color: #333;
  }
</style>