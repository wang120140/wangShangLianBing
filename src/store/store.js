import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex)
 
const state = {
  pjtnews: 0,
  count: 1,
  zhaGangTiChuDong:[271,272,273,274,275,276,277,278,279,280],  // 轧钢工 风起初动
  zhaGangTiZhengFen:[281,282,283,284,285,286,287,288,289,290],// 轧钢工争分夺秒哪一个关卡
 
  qianGong1:[151,152,153,154,155,156,157,158,159,160], // 钳工
  
  anQuanZhengFen:[551,552,553,554,555,556,557,558,559,560],// 安全争分多秒
  zhiLiangZhengFen:[311,312,313,314,315,316,317,318,319,320],//质量知识体系争分夺秒
  lianzhuZhengFen:[131,132,133,134,135,136,137,138,139,140],//连铸工争分夺秒
  dianGong1:[31,32,33,34,35,36,37,38,39,40], // 电工1
  dianGong2:[41,42,43,44,45,46,47,48,49,50],
  dianGong3:[51,52,53,54,55,56,57,58,59,60], // 电工3
  qianGong3:[171,172,173,174,175,176,177,178,179,180], // 钳工3
  zhaGang3:[291,292,293,294,295,296,297,298,299,300],// 轧钢工3
  anQuan3:[561,562,563,564,565,566,567,568,569,570], //安全
  anQuan2:[],
  subqu:1,
  userName:'',
  userNum: '',
}

const getters = {

}
const mutations = {
  SER_USER_NAME (state,parm) {
    state.userName = parm ;
  },
  SET_USER_NUM (state ,parm ) {
    state.userNum = parm
  },
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