<template>
  <div class="normal-list">
    <div class="item" v-for="(item, index) in listData" :key="index">
      <span class="icon">
        <img :src="iconURL(item)" alt="">
      </span>
      <div class="info">{{item.info}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NormalListView',
    props: {
      listData: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      iconURL(item) {
        return require('assets/img/profile/' + item.icon)
      }
    }
  }
</script>

<style scoped>
  .normal-list {
    margin-top: 15px;
    font-size: 15px;
    color: #333;
    background-color: #fff;
  }

  .normal-list .item {
    position: relative;
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid rgba(100, 100, 100, .2);
  }

  .item:last-of-type {
    border-bottom: none;
  }

  .item .icon {
    position: absolute;
    left: 16px;
    top: 5px;
  }

  .icon img {
    width: 20px;
    height: 20px;
  }

  .item .info {
    margin-left: 45px;
  }
</style>