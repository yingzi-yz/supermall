import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  addCart(context, payload) {
    // 方法一、判断商品是否重复
    // let oldProduct = null;
    // for (let item of context.state.cartList) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = item;
    //   }
    // }

    // 方法二
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct);
        resolve('当前的商品数量+1');
      } else {
        payload.count = 1;
        context.commit(ADD_TO_CART, payload);
        resolve('加入购物车成功!');
      }
    })
  }
}