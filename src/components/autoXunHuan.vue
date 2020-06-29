<template>
    <div>
      
        <div>
           ---{{HadScore}}
        </div>
       
        <hr>
        <div class="containFlex">
            <div>
                  <div>--- <span>{{ whichCard}}</span></div>
                  <div>----- {{answerNum}} </div>
                  <div>----- <span>{{hadScore}}</span> </div>
            </div>

            
        </div>
        
        <hr>


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
   import answer27101 from './PassWord'   


    export default {
        data() {
            return {
              needScore:2000,
              hadScore:0,
              whichCard:0,
              sendTimeNum:'',
              answerNum:0, 
              iframe0:'', 
              iframeContent:[],
              subqu:1, 
              yiChangNum:0,
              yiChangCtr:false,
              getScore:'0',
              showData:false,
              HadScore:0, 
              ctr500:false,
              UserName:'',
              UserNum : '',
              cuoWu:0,
            }
        },
        computed: {
            getTongGuan(){

                return this.$store.state.qianGong2
                
            },
        
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
                
                _this.whichCard = _this.getTongGuan[_this.subqu];
                
                _this.whichOne();
              
            },
            
            whichOne (){
                let _this = this;
               
                axios.get("/cglb/dt?id="+_this.whichCard+"&matchid=0").then( (res) => {
                  
                    _this.iframeContent.push(res.data);
                  
                
                    if(_this.iframeContent[0].indexOf("该关口未解锁") != -1 || _this.iframeContent[0].indexOf("从第一关开始") != -1  ) {
                       _this.subqu++;
                       if(_this.subqu >= 10) {
                           _this.subqu =0
                       }
                       sessionStorage.setItem("ADCFRTGU789KOJHY7", this.subqu);
                       _this.$router.go(0);
                    }
                    if(_this.iframeContent[0].indexOf("今天的闯关时间已用尽") != -1) {
                         _this.whichCard = "今天已经打完，明天再来，"
                    } else {
                         _this.sendFirst(); 
                    }
                    
                })
            },
            
            sendFirst () {
                let _this = this;
                axios.get("/cglb/ajaxdt?passid="+_this.whichCard+"&id=0&answer=0").then( (res) => {
                   
                    _this.sendRight() // 开始答题
                })
            },
            
            sendRight () {
                // debugger
                let _this = this;
                _this.sendTimeNum = setTimeout( () => {
               
                    var aNum = setTimeout( () => {
                          _this.answerNum--;
                          _this.sendRight();
                        _this.yiChangCtr = true;
                    },20000+_this.yiChangNum*3000);
            
                    let randomNum = Math.floor( Math.random()*160+1);   
                    document.cookie = getCookieValue.a
                    document.cookie = getCookieValue.b
                    document.cookie = getCookieValue.c

                    _this.answerNum++;  
               
                   if(_this.answerNum> 10*(1+Number(_this.subqu) ) ){ // 如果大于10的话
                    
                       for(let i=0;i<9999;i++){
                              clearTimeout(i)
                           }
                       clearTimeout(_this.sendTimeNum);
                       clearTimeout(aNum)
                
                       _this.answerNum = 0 // 答题重新为0
                      
                       _this.subqu++;
                       sessionStorage.setItem("ADCFRTGU789KOJHY7", this.subqu);
                       if(_this.subqu>=10){
                     
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
                      if(  _this.answerNum == _this.cuoWu||_this.answerNum == _this.cuoWu ) {
                          //debugger
                        axios.get("/cglb/ajaxdt?passid="+_this.whichCard+"&id=20288&answer=D").then( (res) => {     
                           for(let i=0;i<9999;i++){
                              clearTimeout(i)
                           }
                        if(res.data.isright === -1) { // 控制答题速度过快的情况。
                        // debugger
                            _this.answerNum--;
                          _this.sendRight();
                        }

                        _this.yiChangCtr = false;
                        document.cookie = getCookieValue.a
                        document.cookie = getCookieValue.b
                        document.cookie = getCookieValue.c
                        if(!_this.yiChangCtr){
                            _this.sendRight();
                        }
                        
                     } )
                      } else{
                          axios.get("/cglb/ajaxdt?passid="+_this.whichCard+"&id="+answer27101[randomNum].id+"&answer="+answer27101[randomNum].answer).then( (res) => {     
                           for(let i=0;i<9999;i++){
                              clearTimeout(i)
                           }
                        if(res.data.isright === -1) { // 控制答题速度过快的情况。
                        // debugger
                            _this.answerNum--;
                          _this.sendRight();
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
                      
                     }
                                  

                } ,1900+(Math.random()*500))
              
            },
        
            getRightData () {
               let _this = this;
               axios.get("/cglb/passresult?passid="+_this.whichCard+"mathchid=0").then( (res) => {
                   
                 

               } )
            },
            
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
            console.log(this.subqu)
            this.cuoWu = Math.ceil(((this.subqu+1)*10)*Math.random()) 
            console.log(this.cuoWu+'cuo eu ');
            
            ( (new Date().getTime()) < (new Date("2020-6-30").getTime() ) ) &&
              this.beginAnswer(); 
            let _this = this;
            
        
            axios.get("/users/trajectory").then( (res) => {
                _this.getScore = res.data;
            })

             setTimeout( () => {
                
                 try {
                     var li0 = document.getElementsByTagName("script");
                  
                    var li = document.getElementsByTagName("script")[11].text;
            
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
                      
                        _this.HadScore = pram.series[0].data[5]
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