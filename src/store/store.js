import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex)
 
const state = {
  pjtnews: 0,
  count: 1,
  zhaGangTiChuDong:[271,272,273,274,275,276,277,278,279,280],  // 轧钢工 风起初动
  zhaGangTiZhengFen:[281,282,283,284,285,286,287,288,289,290],// 轧钢工争分夺秒哪一个关卡
  qianGongChuDong:[151,152,153,154,155,156,157,158,159,160], // 钳工
  qianGong3:[171,172,173,174,175,176,177,178,179,180],
  anQuanZhengFen:[551,552,553,554,555,556,557,558,559,590],// 安全争分多秒
  zhiLiangZhengFen:[311,312,313,314,315,316,317,318,319,320],//质量知识体系争分夺秒
  lianzhuZhengFen:[131,132,133,134,135,136,137,138,139,140],//连铸工争分夺秒
  dianGong3:[51,52,53,54,55,56,57,58,59,60],
  subqu:1,
}

const getters = {

}
const mutations = {
  add(state) {
    state.count += 1;
  },
  addsubqu(state){
    state.subqu +=1;
  },
  reducesubqu(state){
    state.subqu = 0;
  },
  reduce(state) {
    state.count -= 1;
  }
}

const actions = {

}

export default new Vuex.Store({
  state,
  mutations

})