<template>
  <div class="user-info">
    <img src="~assets/img/profile/avatar.svg" alt="" class="avatar">
    <div class="info">
      <div class="login">登录——注册</div>
      <div class="phone">
        <img src="~assets/img/profile/phone.svg" alt="">
        <span>暂时未绑定手机号</span>
      </div>
    </div>
    <div class="arrow">
      <img src="~assets/img/common/arrow-left.svg" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UserInfo'
  }
</script>

<style scoped>
  .user-info {
    display: flex;
    height: 85px;
    padding: 6px 15px;
    color: #fff;
    background-color: var(--color-tint);
  }

  .user-info .avatar {
    width: 70px;
    height: 70px;
  }

  .info {
    /* flex设置1是为了占剩余的全部位置 */
    flex: 1;
    padding-left: 15px;
  }

  .info .login {
    margin-top: 15px;
  }

  .phone img {
    width: 20px;
    height: 30px;
    margin-left: -5px;
    vertical-align: middle;
  }

  .phone span {
    font-size: 13px;
  }

  .arrow {
    width: 20px;
    line-height: 85px;
  }

  .arrow img {
    width: 20px;
  }
</style>