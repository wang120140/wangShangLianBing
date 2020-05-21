<template>
    <div>
        <!-- <div>自主循环答题</div>
        <div>循环一幕</div> -->
        <!-- <span>需要答题分数</span> <input type="text" v-model="needScore">  -->
        <div>
           ---{{HadScore}}
        </div>
        <!-- <button @click="resetBegin">开始答题</button>
        <button @click="stopDaTi">停止刷题</button> 
        <button @click="resetBegin">重新开始答题</button> -->
        <hr>
        <div class="containFlex">
            <div>
                  <div>--- <span>{{ whichCard}}</span></div>
                  <div>----- {{answerNum}} </div>
                  <div>----- <span>{{hadScore}}</span> </div>
            </div>
            <!-- <div>
                <button>钳工</button>
                 <button>轧钢工</button>
            </div> -->
            <!-- <div>
                  <div>
                    <button>第一关</button>
                    <button>第二关</button>
                    <button>第三关</button>
                    <button>第四关</button>
                    <button>第五关</button>
                </div>
                <div>
                    <button>第六关</button>
                    <button>第七关</button>
                    <button>第八关</button>
                    <button>第九关</button>
                    <button>第十关</button>
                </div>
            </div> -->
            
        </div>
        
        <hr>
        <!-- <div>
            <div v-for="(item,index) in iframeContent" :key="index">
              <div>{{index}}</div>
              <br>
              
              <span> {{item}}</span>
              <hr>
            </div>
        </div> -->

          <div>
          {{UserName}}
       </div>
       <div>
          {{UserNum}}
       </div>
        <div v-show="showData" v-html="getScore">
       
       </div>
     
    </div>
</template>

<script>
   import axios from 'axios'  // 获得axios
   import getCookieValue from './cookie'  // 获得cookie
   import answer27101 from './PassWord'   // 获得问题答案


    export default {
        data() {
            return {
              needScore:2000,
              hadScore:0,
              whichCard:0,
              sendTimeNum:'',
              answerNum:0, // 回答几个
              iframe0:'', // 插入ifram0we年
              iframeContent:[],//内容
              subqu:1, // 顺序答题顺序
              yiChangNum:0,// 异常的数量
              yiChangCtr:false,//异常控制情况
              getScore:'0',
              showData:false,
              HadScore:0, // 已经刷了多少分
              ctr500:false,
              UserName:'',
              UserNum : '',
            }
        },
        computed: {
            getTongGuan(){

                return this.$store.state.anQuan3
                
            },
            // subqu(){
            //    return this.$store.state.subqu;
            // }
        },
        methods: {
            // 重新开始
            resetBegin(){
                let _this = this;
                for(let i =0;i<9999;i++){
                    clearTimeout(i)
                }
                _this.sendRight();
            },
            beginAnswer () {
                
                let _this = this;
               //  _this.whichCard = _this.zhaGangTiZhengFen[9]
                
                console.log(_this.getTongGuan)
                _this.whichCard = _this.getTongGuan[_this.subqu];
                // 开始选择那一关
                _this.whichOne();
              
            },
            //  识别那一关
            whichOne (){
                let _this = this;
               
                axios.get("/cglb/dt?id="+_this.whichCard+"&matchid=0").then( (res) => {
                  
                    _this.iframeContent.push(res.data);
                  
                    // 设置自动找合适的关卡
                    if(_this.iframeContent[0].indexOf("该关口未解锁") != -1) {
                       _this.subqu++;
                       if(_this.subqu >= 10) {
                           _this.subqu =0
                       }
                       sessionStorage.setItem("ADCFRTGU789KOJHY7", this.subqu);
                       _this.$router.go(0);
                    }
                    _this.sendFirst(); // 开始发送第一题
                })
            },
            // 发送第一题
            sendFirst () {
                let _this = this;
                axios.get("/cglb/ajaxdt?passid="+_this.whichCard+"&id=0&answer=0").then( (res) => {
                   
                    _this.sendRight() // 开始答题
                })
            },
            //发送正确的题目
            sendRight () {
                let _this = this;
                _this.sendTimeNum = setTimeout( () => {
               // 控制异常的情况
                    var aNum = setTimeout( () => {
                          _this.answerNum--;
                          _this.sendRight();
                        _this.yiChangCtr = true;
                    },20000+_this.yiChangNum*3000);
                // 控制异常情况结束
                    let randomNum = Math.floor( Math.random()*160+1);   
                    document.cookie = getCookieValue.a
                    document.cookie = getCookieValue.b
                    document.cookie = getCookieValue.c

                    _this.answerNum++;  // 对答题个数计数
               
                   if(_this.answerNum> 10*(1+Number(_this.subqu) ) ){ // 如果大于10的话
                       // 消除周期定时器
                       for(let i=0;i<9999;i++){
                              clearTimeout(i)
                           }
                       clearTimeout(_this.sendTimeNum);
                       clearTimeout(aNum)
                       // 拿到结果
                       _this.answerNum = 0 // 答题重新为0
                      
                       _this.subqu++;
                       sessionStorage.setItem("ADCFRTGU789KOJHY7", this.subqu);
                       if(_this.subqu>=10){
                        // this.$store.commit("reducesubqu"); // 发送改变状态 
                        sessionStorage.setItem("ADCFRTGU789KOJHY7", 0);  
                       }
                       _this.getRightData();
                   
                      
                       setTimeout( ()=>{ 
                           console.log(2)
                         //  debugger 
                        //  this.$router.push({
                        //      path:'/',
                        //      query: {
                        //         acc:1
                        //      }
                        //  })
                           this.$router.go(0);
                       },1200 )
                      
                       // this.$router.push('/auto');
                       
                     }else{
                        // if(_this.answerNum == 10*(1+Number(_this.subqu) ) ) {
                        //     console.log("执行这个多一个")
                        //     axios.get("/cglb/ajaxdt?passid="+_this.whichCard+"&id="+answer27101[randomNum].id+"&answer="+answer27101[randomNum].answer).then( () => {
                        //         _this.getRightData()
                        //     } )
                        // }
                       axios.get("/cglb/ajaxdt?passid="+_this.whichCard+"&id="+answer27101[randomNum].id+"&answer="+answer27101[randomNum].answer).then( (res) => {
                        
                       
                           
                           for(let i=0;i<9999;i++){
                              clearTimeout(i)
                           }
                        
                        if(res.data.isright === -1) { // 控制答题速度过快的情况。
                        console.log(3)
                        // debugger
                            _this.$router.go(0)
                        }

                        _this.yiChangCtr = false;
                        document.cookie = getCookieValue.a
                        document.cookie = getCookieValue.b
                        document.cookie = getCookieValue.c
                        if(!_this.yiChangCtr){
                            _this.sendRight();
                        }
                        
                     } )
                     }
                
                   
                   

                } ,1900)
              
            },
            // 获取正确的数据 
            getRightData () {
               let _this = this;
               axios.get("/cglb/passresult?passid="+_this.whichCard+"mathchid=0").then( (res) => {
                   
                   // let  reg = /(?<=\<ul\>).+(?=\<\\ul\>)/;
                   // _this.iframe0 = res.data.match(reg);
                   // _this.iframe0 = res.data;
                   

                   // _this.beginAnswer(); // 从新开始

               } )
            },
            // 停止刷题
            stopDaTi(){
                let _this = this;
                clearTimeout(_this.sendTimeNum);
            },

            
        },
        beforeCreate(){
             let _this = this;
            axios.get("/users/trajectory").then( (res) => {
                _this.showData = false;
                _this.getScore = res.data;
            })
        },
        mounted() {
            
            this.UserName = this.$store.state.userName;
            
            this.UserNum  = this.$store.state.userNum;
            this.subqu = Number(sessionStorage.getItem("ADCFRTGU789KOJHY7")) ;
              this.beginAnswer(); // 开始自动答题
            let _this = this;
            
            // 设置分数阀门值
            axios.get("/users/trajectory").then( (res) => {
                _this.getScore = res.data;
            })

             setTimeout( () => {
                
                 try {
                     var li0 = document.getElementsByTagName("script");
                  
                    var li = document.getElementsByTagName("script")[11].text;
                    console.log(li)
                    if(li == ""){
                         li = document.getElementsByTagName("script")[12].text;
                    }
                    var echarts={};
                    var option;
                    var myChart = {} ; 
                    console.log("....****")
                    myChart.setOption = function(){
                        console.log(0) //
                    }
                    echarts.init = function(){
                    return {setOption:function(pram){
                        console.log("....")
                        console.log(pram) // 所有的script标签
                        console.log(pram.series) // 获得多少的分数
                        _this.HadScore = pram.series[0].data[4]
                        let a;
                        a = sessionStorage.getItem("willScore");
                        if(Number(a) < Number(_this.HadScore)){
                        _this.$router.push('/')
                        }
                    }}
                    }
                    
                    if(li == undefined) {
                      _this.HadScore = "2222"
                    }else{
                        eval(li)
                    }
                    eval(li)
                } catch (error) {
                      console.log(error)
                      console.log("错误的信息....")
                 }
                
                
                console.log( typeof(li));
       
            } , 500 )
            // 设置分数阀门值结束

            setTimeout ( ()=> {
                console.log(4)
                // debugger
                this.$router.go(0)
            },25000 )
            
        },
        beforeUpdate(){
           // console.log("数据更新之前")
        },
        updated(){
           //  console.log("数据更新完成....")
        },
        beforeDestroy() {
            for(let i=0;i<9999;i++){
               clearTimeout(i)
            }
        },
    }
</script>

<style  scoped>
     .containFlex {
         display: flex;
         justify-content: space-around;  
     }
     .clearFloat:after {
       content: " ";
       clear: both;
       height: 0;
       display: block;
     }
     .centerF {
         display: flex;
         justify-content: center;
         align-items: center;
     }
</style>