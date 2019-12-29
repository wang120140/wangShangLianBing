<template>
  <div @click="wang" class="hello">
    <router-link to="Auto"> 自主答题 </router-link>
    <input type="number" placeholder="yyyy--mm-dd" v-model="WillGetScore" @blur="setWillScore">
    <div >{{fangXiang[6]}} {{leibie[1]}} <button @click=" getHouTaiData()">开始</button>  <button @click="wang(0,1)">结束</button></div>
    <button @click="getData(0)">导出表格</button>   <button @click="daTi">答题</button> <button  @click="daTiOff">停止答题</button>
    <div class="aaa">已答题{{datiNum}}</div>   <button @click="clearnZero">清零</button>
     <span>答题限制个数</span><button @click="plus10">减10</button><input placeholder="默认是10个" type="text" v-model="datiNumLimit"><button @click="add10">加十</button>
      
      <button class="aaa" @click="zuoTi(10)">做10道题</button>
      <button class="aaa" @click="zuoTi(20)">做20道题</button>
      <button class="aaa" @click="zuoTi(30)">做30道题</button>
      <button class="aaa" @click="zuoTi(40)">做40道题</button>

      <button class="aaa" @click="zuoTi(50)">做50道题</button>
      <button class="aaa" @click="zuoTi(60)">做60道题</button>
      <button class="aaa" @click="zuoTi(70)">做70道题</button>
      <button class="aaa" @click="zuoTi(80)">做80道题</button>

      <button class="aaa" @click="zuoTi(90)">做90道题</button>
      <button class="aaa" @click="zuoTi(100)">做100道题</button>

      <el-table :data="a" style="width: 100%" height="550">
      <el-table-column prop="num"   label="第几个" ></el-table-column>
      <el-table-column prop="id"   label="题的编码" id="outTable"   ></el-table-column>
      <el-table-column prop="answer"   label="答案" id="outTable"   ></el-table-column>
      <el-table-column prop="difficulty"    label="难易度"></el-table-column>
      <el-table-column prop="title"   label="内容" width="180"></el-table-column>
      <el-table-column prop="type"   label="类型" ></el-table-column>
      <el-table-column prop="a"     label="选项A" ></el-table-column>
      <el-table-column prop="b"     label="选项B"> </el-table-column>
      <el-table-column prop="c"     label="选项C"> </el-table-column>
      <el-table-column prop="d"     label="选项D"> </el-table-column>
      <el-table-column prop="e"     label="选项E"> </el-table-column>
    </el-table>
     <div v-if="showData" v-html="getScore">
       <!-- {{getScore}} -->
     </div>
  </div>
</template>

<script>
 import axios from 'axios'
 import dayjs from 'dayjs'
//  import XLSX from 'xlsx';

import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import answer27101 from './PassWord'

import getCookieValue from './cookie'

export default {
  name: 'HelloWorld',
  
  data () {
    return {
      fangXiang:["产品质量工","电工","电焊工","连铸工","天车工","自动化控制","轧钢工","转炉炼钢工","党史","高炉工长","烧结工","烧结原料工","安全"],
      leibie : ["风气出动","争分夺秒","险种求生"],
      msg: 'Welcome to Your Vue.js App',
      a : [], // 题库数据
      timeCount:true, // 获取数据的定时器
      timeCountBtn:"", // 按钮定时器
      downNum : 0,
      tipNum: 0,
      danXuanTi:["A","B","C","D"],
      duoXuanTi:["ABCD","ABC" , "ABD" , "ACD" , "BCD" ,
            "AB", "AC" , "AD" , "BC" , "BD" , "CD"],
      duoXuanTiE:["ABCD","ABCE","ABDE","ACDE","BCDE","ABCDE",
             "ABC","ABD","ABE","ACD","ACE","ADE","BCD","BCE","BDE","CDE",
             "AB","AC","AD","AE","BC","BD","BE","CD","CE","DE"],
      panDuanTi:["%E5%AF%B9" , "%E9%94%99"],
      tiMuLinShiCunFang:{
        id:[],
        answer:''
      },
      // 题目正确答案类型
      tiAllInformation:{
        answer:"%E5%AF%B9",
        id:20287,
        typeid:1, // 题目类型
      }, // 输出的整个题的所有信息
      tiId:'', // 题目的id
      tiType:'', // 题目类型  1 单选题 2 多选题  3 判断题
      tiIsRight:'', // 是否正确  -1 答题太快 1 正确答案 2 错误答案
      tiRightAnswer:'', // 正确答案
      // 题目正确答案类型结束
      // 循环的长度
      tiLength:"" ,// 答案长度
      tiTempAnswer: '', //临时答案

      yiChangError: true,
      yiChangErrornUM:0,

      // 答题开关
      datiOffNum:'',
      datiNum:0,
      datiNumLimit:10,

      // 第一道题

      datiStart0:true,
      getScore:'0',

      showData: false,
     // 要刷多少分数
      WillGetScore:0
    }
  },
  methods: {
    // 设置要刷的分数
    setWillScore(){
      sessionStorage.setItem("willScore",this.WillGetScore)
    },
    // 
    zuoTi(pram){
      this.datiNum = 0;
      this.datiNumLimit = pram;
      this.daTi();
    },
    // 清零
    plus10(){
      this.datiNumLimit = this.datiNumLimit-10;
    },
    add10() {
      this.datiNumLimit= this.datiNumLimit+10;
    },
    clearnZero(){
      this.datiNum = 0 ;
    },
    // 答题个数
    // 开始答题
    daTi(){ 
      
      // if(this.datiStart0) {
      //   this.startDaTi()
      // }
       console.log(document.cookie);
      this.datiOffNum =setTimeout( () => {
       
      let randomNum = Math.floor( Math.random()*160+1);
      let _this = this;
        // console.log(document.cookie)
      
        // document.cookie = "PHPSESSID=a5k7h1idne59vkiif9frprj5l5;"
        // document.cookie = 'HyGHnOvkdQZ0y=34326;'
        // document.cookie = 'safetycode=9024;'
        //"PHPSESSID=ei02nv0gv1dl1st8addeg14902; HyGHnOvkdQZ0y=34322; safetycode=2826"
document.cookie = getCookieValue.a
document.cookie = getCookieValue.b
document.cookie = getCookieValue.c
        axios.get("/cglb/ajaxdt?passid=274"+"&id="+answer27101[randomNum].id+"&answer="+answer27101[randomNum].answer).then( (res) => {
            _this.datiStart0 = false;
            // document.cookie = "PHPSESSID=a5k7h1idne59vkiif9frprj5l5;"
            // document.cookie = 'HyGHnOvkdQZ0y=34326;'
            // document.cookie = 'safetycode=9024;'
document.cookie = getCookieValue.a
document.cookie = getCookieValue.b
document.cookie = getCookieValue.c
             console.log(res);
            _this.datiNum++;
            if(Number(_this.datiNum)<Number(_this.datiNumLimit)-1) {
              _this.daTi();
            }else{
             
              this.datiNum = "打完了。。。。。。"
              // axios.get("/cglb/passresult?passid=301&matchid=0").then( (res2) => {  // 获得成绩
              //    console.log(res2)
               

              //   axios.get("/cglb/dt?id=302&matchid=0").then( (res)=> {
              //         console.log("发送请求答题 ");
              //         console.log(res)
              //         axios.get("/cglb/ajaxdt?passid=302&id=0&answer=0").then( (res0)=> {
              //           console.log(res0)
              //           console.log("kai shi le... ")
              //     }  )
              //   } )


              // })
            }
            
       })

      } ,2900)
    },

   startDaTi(){
      axios.get("/cglb/dt?id=301&matchid=0").then( (res)=> {
        console.log("发送请求答题 ");
        console.log(res)
        axios.get("/cglb/ajaxdt?passid=301&id=0&answer=0").then( (res0)=> {
          console.log(res0)
          console.log("kai shi le... ")
     }  )
      } )
     
   },
   // 停止答题
   daTiOff(){
     clearTimeout(this.datiOffNum)
   },
    // 第二次  优化第一次 从后台拿数据  同时从后台拿答案  

    getHouTaiData(){ 
      // try {
        let _this = this;
       setTimeout( ()=> {
        
           
           setTimeout( () => {  // 控制异常
             if(_this.yiChangError) {
               _this.yiChangErrornUM++;
               _this.getHouTaiData();
             }
            
             _this.yiChangError = true; 
           },5000+_this.yiChangErrornUM*3000);
           // ajaxdt?passid=361&id=0&answer=0
           // http://1.85.1.34:8023/index/cglb/ajaxdt?passid=281&id=140126&answer=%E5%AF%B9
           //  http://1.85.1.34:8023/index/cglb/ajaxdt?passid=281&id=20287&answer=%E5%AF%B9  // 轧钢厂 争分夺秒  281
         axios.get("/cglb/ajaxdt?passid=361"+"&id="+_this.tiAllInformation.id+"&answer="+_this.tiAllInformation.answer).then( (res) => {
               // 把数据暂时缓存在一个临时变量中
               
              _this.yiChangError =false;  // 控制异常
             
               if(res.data.isright == 1) {  // 如果这道题对的话 进行替换题目 1-->3

                    // _this.tiAllInformation.answer = _this.tiAllInformation.answer; // 把答案给题目完整信息中
                    // if(_this.tiAllInformation.answer =='%E5%AF%B9'){
                    //   _this.tiAllInformation.answer = "对"
                    // }
                    (_this.tiAllInformation.answer =='%E5%AF%B9')&&(_this.tiAllInformation.answer = "对");
                    (_this.tiAllInformation.answer =='%E9%94%99')&&(_this.tiAllInformation.answer = "错");
                    _this.tiAllInformation.num = _this.tipNum;
                    this.tipNum++ ;  
                   // console.log(_this.tiAllInformation)
                    _this.a.push(_this.tiAllInformation); // 把单个数据送到整体数据中
                   // console.log(a)
                    if(_this.a.length >=100) { // 打印数据  从新开始
                      _this.getExcel() // 打印数据
                    }

                    _this.tiAllInformation = res.data.question;// 开始下一个数据
                     _this.tiLength = 0 ;// 设置长度
                    if(_this.tiAllInformation.typeid == 1) {  // 如果是单选题 

                        
                        _this.tiTempAnswer = _this.danXuanTi;  // 可能的答案放到一个临时数据里面
                        _this.tiAllInformation.answer = _this.tiTempAnswer[_this.tiLength]; // 答案给与一个
                        _this.getHouTaiData(); // 从后台拿数据
                        console.log("做一个标注1")
                        
                    } else if (_this.tiAllInformation.typeid == 2) {  // 如果是多选题 
                        
                        if(_this.tiAllInformation.e ==''){
                          _this.tiTempAnswer = _this.duoXuanTi;
                        }else {
                           _this.tiTempAnswer = _this.duoXuanTiE;
                        }
                         // 可能的答案放到一个临时数据里面
                        _this.tiAllInformation.answer = _this.tiTempAnswer[_this.tiLength];
                        _this.getHouTaiData(); //从后台拿数据
                        console.log("做一个标注2")

                    } else if(_this.tiAllInformation.typeid == 3) { // 如果是判断题
                        
                          _this.tiTempAnswer = _this.panDuanTi ; // 可能的答案放到一个临时数据里面
                          _this.tiAllInformation.answer = _this.tiTempAnswer[_this.tiLength];
                          _this.getHouTaiData();  // 从后台拿数据
                          console.log("做一个标注3")

                    }  
               } else if(res.data.isright == 2) {  // 如果错误的话  接着找答案   2 
                
                 if( _this.tiAllInformation.typeid==1 && _this.tiLength >= 4) {
                      console.log(_this.tiAllInformation);
                      console.log("这个有问题");
                      _this.tiAllInformation.answer ="%E5%AF%B9";
                       _this.tiAllInformation.id = 20287;
                       _this.tiAllInformation.typeid = 1;
                       _this.tiTempAnswer = _this.panDuanTi;
                       _this.tiLength = 0 ;
                       _this.getHouTaiData();
                      //return
                    }else if ( _this.tiAllInformation.typeid==2 && _this.tiAllInformation.e == ''&& _this.tiLength >= 11 ) {
                        console.log(_this.tiAllInformation);
                        console.log("这个有问题");
                        _this.tiAllInformation.answer ="%E5%AF%B9";
                       _this.tiAllInformation.id = 20287;
                        _this.tiAllInformation.typeid = 1;
                       _this.tiTempAnswer = _this.panDuanTi;
                       _this.tiLength = 0 ;
                       _this.getHouTaiData();
                        //return
                    }else if (_this.tiAllInformation.typeid==2 && _this.tiAllInformation.e != ''&& _this.tiLength >=26 ) {
                        console.log(_this.tiAllInformation);
                        console.log("这个有问题");
                        _this.tiAllInformation.answer ="%E5%AF%B9";
                       _this.tiAllInformation.id = 20287;
                       _this.tiAllInformation.typeid = 1;
                       _this.tiTempAnswer = _this.panDuanTi;
                       _this.tiLength = 0 ;
                       _this.getHouTaiData();
                    }else if (_this.tiAllInformation.typeid==3 && _this.tiLength >= 2) {
                        console.log(_this.tiAllInformation);
                        console.log("这个有问题");
                       _this.tiAllInformation.answer ="%E5%AF%B9";
                       _this.tiAllInformation.id = 20287;
                        _this.tiAllInformation.typeid = 1;
                       _this.tiTempAnswer = _this.panDuanTi;
                       _this.tiLength = 0 ;
                       _this.getHouTaiData();
                        //return
                    }else {
                      _this.tiLength ++;
                      _this.tiAllInformation.answer = _this.tiTempAnswer[_this.tiLength];
                      _this.getHouTaiData();
                    }
                      
                    
                    console.log("做一个标注0")

               } else if (res.data.isright == -1) {  // 如果答题快的话   接着找答案
                  // _this.tiLength = 2; // 设置长度
                  //     if(_this.tiLength >= 2) {
                  //       console.log(_this.tiAllInformation)
                  //       console.log("这个有问题");
                  //       return
                  //   }
                  // _this.tiAllInformation.answer = _this.tiTempAnswer[_this.tiLength];
                 //_this.getHouTaiData (); 

              //  } else if ( ){    // 第一次的话；

               } else {   // 如果有其他情况的话  打印出来 进一步查找  
                  console.log("有问题.....")
                  console.log(res.data.isright)

               }
               
               
         } )
       } ,3000);
     // } catch (error) {
        // _this.tiAllInformation.answer ="B";
        // _this.tiAllInformation.id = 20287;
        // _this.tiAllInformation.typeid = 1;
        // _this.getHouTaiData();
      //}// 从后台拿数据  // 参数正确答案
      
    },

   // 对题目类型进行循环遍历
    //  forAnswer(){
    //    let _this = this;
    //    if(_this.tiAllInformation.typeid == 1) {  // 如果是单选题
    //        let leg = _this.danXuanTi.length;
    //        for (let i=0 ; i < leg; i++ ) {
    //            _this.tiAllInformation.answer=
    //        }
    //    } else if (_this.tiAllInformation.typeid == 2) { // 如果是多选题

    //    } else if (_this.tiAllInformation.typeid == 3) {  // 如果是判断题

    //    }
    //  },
     
    // 从后台数据判断类型
    judgeType() {
      if(_this.tiAllInformation != undefined) {  // 判断是否从后台拿到数据
        if(_this.ti){}

      }
    },
    getData(pram) { // 时间按钮
     let _this = this;
     if(pram == 0) {
      //  alert(0)
      _this.getExcel();
     }else if (pram == 600000) {
       alert(1)
       this.timeCountBtn = setInterval( ()=> {
          _this.getExcel();
       },pram)
     }
    },
    getExcel(){ // 导出表格
    let dataNew = new Date()
    require.ensure([], () => {  // 导出表格
      let res = this.a;
      let today = dayjs().year().toString()+"年"
             +dayjs().month().toString()+"月"
             +(dayjs().date()+1).toString()+"日"
             +dayjs().hour().toString()+"时"
             + dayjs().minute().toString()+"分第";
     
      const { export_json_to_excel } = require('../excel/Export2Excel.js')
      const tHeader = ['序号', '类别', '类别', '答案', '题目', 'a', 'b', 'c', 'd', 'e']
      const filterVal = ['id', 'typeid', 'type', 'answer','title', 'a', 'b', 'c', 'd', 'e']
      const list = res
      const data = this.formatJson(filterVal, list)
      let  fileName = this.fangXiang[6]+this.leibie[1]+ today+this.downNum

      if(this.a.length>49) {
         fileName = "*" + fileName;
      }
      this.tipNum = 0 ;
        export_json_to_excel(tHeader, data,fileName) //表格的名字
        this.downNum++;
        this.a = [] // 重置数据
      })
    },

    formatJson(filterVal, jsonData){ // 导出表格格式
      console.log(jsonData)
        var arr= jsonData.filter(function (el) {
                       
                        return (el !== undefined);
                   });
      console.log(arr)
      console.log("arr")
        return arr.map(v => filterVal.map(j => v[j]))
    },
     // 第一次 写从后台拿数据  
    wang(pram,pram1){  // 获取数据

      let _this = this;
      let zhaGangGong ;
         zhaGangGong = [
           'passid=271&id=20287&answer=A',
           'passid=271&id=138064&answer=D',
           'passid=271&id=139221&answer=C',
           'passid=271&id=64779&answer=B',
           'passid=271&id=66351&answer=%E5%AF%B9',
           'passid=271&id=20375&answer=B',
           'passid=271&id=140646&answer=%E5%AF%B9',
           'passid=271&id=66331&answer=%E5%AF%B9',
           'passid=271&id=139446&answer=%E9%94%99',
           'passid=271&id=66373&answer=%E9%94%99',
         ];
         let shiYan = [
           'passid=271&id=20287&answer=B', // 正确答案
           'passid=271&id=20287&answer=C',
           'passid=271&id=20287&answer=D',
           'passid=271&id=20287&answer=A',
         ]
     //http://1.85.1.34:8023/index/cglb/ajaxdt?passid=291&id=141227&answer=%E5%AF%B9  险种求生
      if(pram1 == 0){   // 开始按钮 
         let b = 0;
         
        _this.timeCount =  setInterval( () => {
          if(_this.a.length>100) {   // 超区 100 的话  导出 数据
            _this.getExcel();
          }
          let pramW = zhaGangGong[Math.floor(Math.random()*10)]  // 随机一个数据 
              // console.log(pramW);

                  if(pram == 0){
                    (b >=4)&&(b = 0);

                      axios.get("/cglb/ajaxdt?"+shiYan[b]).then((res) => {  // 拿数据
                     
                        if(res.data.question && res.data.question != undefined ) {
                        
                        // 拿到正确答案
                        // 1.0 把各个答案拿过来
                         _this.tiId = res.data.question.id // 题目唯一编码
                         _this.tiType = res.data.question.typeid // 拿到题目类型
                         _this.tiIsRight = res.data.isright; // 是否正确
                         
                         if(_this.tiType == 1) {  // 单选题
                            _this.danXuanTi.forEach( (item ,index) => {
                               
                            } )
                         }else if(_this.tiType == 2 ){  // 多选题

                         }else if (_this.tiType == 3) // 判断题



                          res.data.question.num = this.tipNum; // 对题目进行显示编号
                          this.tipNum++ ; // 
                        }
                        _this.a.push(res.data.question)
                      })
                      b++;
                  }
                },3000)
       
       
      }else if(pram1 == 1){  // 结束按钮 
         if(this.timeCount){clearTimeout(this.timeCount)}
      }
      
       
       
      
    },

     
  },
  beforeCreate(){
     let _this = this;
    axios.get("/users/trajectory").then( (res) => {
      _this.showData = true;
      _this.getScore = res.data;
    })
  },
  mounted(){
    // document.cookie = "PHPSESSID=t3i5soiq13ajk94j0erg3t7pk1; HyGHnOvkdQZ0y=34322; safetycode=7392; Hm_lvt_eaa57ca47dacb4ad4f5a257001a3457c=1573197209,1573265102,1573279361; Hm_lpvt_eaa57ca47dacb4ad4f5a257001a3457c=1573286237"
    console.log(document.cookie)
    console.log(answer27101)
    if(!sessionStorage.getItem("ADCFRTGU789KOJHY7")){
      sessionStorage.setItem("ADCFRTGU789KOJHY7",0)
    }
   
    
  
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.aaa{
  font-size: 50px;
}
input {
  font-size: 50px;
}
</style>
