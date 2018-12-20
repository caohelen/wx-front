import { create } from "domain";

// 配置项

// const host = 'http://localhost:5757'//本地
const host = 'http://mp.xhjiayou.cn'//线上

const config = {
  host,
  loginUrl: `${host}/wx/login`,
  selectlogin: `${host}/wx/selectlogin`,//查询是否登入
  login: `${host}/wx/login`,//登入
  getgood: `${host}/wx/getgood`,//查询单个商品
  createcoupon: `${host}/wx/createcoupon`,//创建优惠券
  bargain: `${host}/wx/bargain`,//砍价
  selectgoods: `${host}/wx/selectgoods`,//查询所有商品
  selctbargain: `${host}/wx/selctbargain`,//查询砍价清单
  selectcoupon:`${host}/wx/selectcoupon`,//查询用户是否存在砍价中的优惠券
  modifycoupon:`${host}/wx/modifycoupon`,//修改优惠券状态
  getcoupon:`${host}/wx/getcoupon`,//查看支付优惠券
  paycoupon:`${host}/wx/paycoupon`,//创建支付优惠券
  findcoupon:`${host}/wx/findcoupon`,//查询砍价优惠券

}
export default config
