<template>
  <div class="check-button" :class="{check: isChecked}">
    <img v-show="isChecked" src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: 'CheckButton',
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .check-button {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #aaa;
  }

  .check {
    border-color: #f69;
    background-color:#f69;
  }
</style>