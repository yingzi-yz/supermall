<template>
  <div class="account">
    <div class="account-item">
      <div class="number">
        <span class="balance">0.00</span>元
      </div>
      <div class="account-info">我的余额</div>
    </div>
    <div class="account-item">
      <div class="number">
        <span class="balance">0</span>个
      </div>
      <div class="account-info">我的优惠</div>
    </div>
    <div class="account-item">
      <div class="number">
        <span class="balance">0</span>分
      </div>
      <div class="account-info">我的积分</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AccountInfo'
  }
</script>

<style scoped>
  .account {
    display: flex;
  }

  .account-item {
    /* width: 100%; */
    flex: 1;
    padding: 18px 0;
    text-align: center;
    background-color: #fff;
    border-right: 1px solid var(--color-tint);
    font-size: 13px;
  }

  .account-item:last-of-type {
    border-right: 0;
  }

  .account-item .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }

  .account-info {
    margin-top: 6px;
  }
</style>