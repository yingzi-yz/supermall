<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="total-price">
      合计: 
      <span>{{totalPrice}}</span>
    </div>

    <div class="calculate" @click="calcClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  import {mapGetters} from 'vuex'

  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton
    },
    data() {
      return {
        selectAll: true
      }
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '￥' + this.cartList.filter(item => {
          return item.checked;
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count;
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item => {
          return item.checked;
        }).length
      },
      isSelectAll() {
        // 第一种写法
        // if (this.cartList.length === 0) return false;
        // return !(this.cartList.filter(item => !item.checked).length)
      
        // 第二种写法
        if (this.cartList.length === 0) return false;
        return !this.cartList.find(item => !item.checked)
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) { // 全部选中的情况
          this.cartList.forEach(item => item.checked = false)
        } else {  // 部分或全部未选中的情况
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
        for (let i = 0; i < this.cartList.length; i++) {
          if (this.cartList[i].checked) {
            this.selectAll = false;
            break;
          } else {
            this.selectAll = true;
          }
        }

        if (this.selectAll) {
          this.$toast.show('请选择购买的商品');
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    position: relative;
    height: 44px;
    background-color: #eee;
  }

  .check-content {
    display: flex;
    align-items: center;
    width: 70px;
    height: 44px;
    margin-left: 10px;
  }

  .check-content span {
    margin-left: 5px;
  }

  .total-price {
    flex: 1;
    margin-left: 20px;
    line-height: 44px;
  }

  .total-price span {
    color: orangered;
  }

  .calculate {
    width: 100px;
    line-height: 44px;
    text-align: center;
    font-size: 14px;
    background-color: #ff5777;
    color: #fff;
  }
</style>