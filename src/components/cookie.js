let getCookie ={
    a:'',
    b:'',
    c:''
} ;

 getCookie.a = "PHPSESSID=rebp4dh5bv4tlrmlrpm0596f12;"   
 getCookie.b = "BJ83T0U0lFrKq1=34300;"
 getCookie.c = "safetycode1=1991;"
// BJ83T0U0lFrKq1=34300; safetycode1=1991"
// "PHPSESSID=719fuli4tfddpg6he84i27fv96; BJ83T0U0lFrKq1=20872; safetycode1=9808"
// "PHPSESSID=rebp4dh5bv4tlrmlrpm0596f12; BJ83T0U0lFrKq1=33943; safetycode1=6252"
// "PHPSESSID=o7b27q2675qik8oiat007ishs0; BJ83T0U0lFrKq1=33957; safetycode1=3710"
// BJ83T0U0lFrKq1=33967; safetycode1=4321
// "PHPSESSID=3vhef9ftnkc3913rhkdg7pkqv7; BJ83T0U0lFrKq1=34300; safetycode1=5214"
// "PHPSESSID=3vhef9ftnkc3913rhkdg7pkqv7; BJ83T0U0lFrKq1=20653; safetycode1=5342"
// "PHPSESSID=m094hms6o7ej4c4niijdb71ep1; BJ83T0U0lFrKq1=21030; safetycode1=6170"
//  BJ83T0U0lFrKq1=22753; safetycode1=5834"
// "PHPSESSID=m094hms6o7ej4c4niijdb71ep1; BJ83T0U0lFrKq1=21180; safetycode1=6216"
// "PHPSESSID=rknlfsi2bgijd731ki06pi24f6; BJ83T0U0lFrKq1=20864; safetycode1=8599"
//  "PHPSESSID=rknlfsi2bgijd731ki06pi24f6; BJ83T0U0lFrKq1=34300; safetycode1=8732"
// "PHPSESSID=rknlfsi2bgijd731ki06pi24f6; BJ83T0U0lFrKq1=21524; safetycode1=9820"
// "PHPSESSID=sursjav23egn6jb4e83miar5o6; BJ83T0U0lFrKq1=20856; safetycode1=9459"
// "PHPSESSID=sursjav23egn6jb4e83miar5o6; BJ83T0U0lFrKq1=20632; safetycode1=2382"
// "PHPSESSID=cbbnpgl0l7cbi6em915f0fqfa3; BJ83T0U0lFrKq1=21233; safetycode1=5690"


export default getCookie;

class myPromise {
    constructor(executer){
      this.status = 'pending';

      this.value = undefined;
      this.reason = undefined;
      let resolveFn = value => {
          if(this.status == pending){
              this.status = 'resolve';
              this.value = value;
          }
      }
      let rejectFn = reason => {
          if(this.status = pending) {
              this.status = 'reject';
              this.reason = reason;
          }
      }
      try {
        executer(resolveFn,rejectFn)
      }catch (e){
        rejectFn(e)
      }
    }

    then(onFulled,onRejected){
        if(this.status = 'resolve') onFulled (this.value);
        if(this.status = 'reject')  onRejected(this.reason);
    }

}
(function(w){
    const PENDING = 'pending'
    const RESOLVED = 'resolved'
    const REJECTED = 'rejected'
    class MyPromise2 {
        constructor(fn){
            this.value = null ;
            this.state = PENDING;
            this.resolvedCallback = [];
            this.rejectedCallback = [];
            try{
                fn(this.resolve,this.reject);
            }catch (e){
                this.reject(e)
            }
        }
        resolve = (value) => {
            if(value instanceof MyPromise2)  return value.then(this.resolve,this.reject)
            setTimeout( () => {
                if(this.state == PENDING){
                    this.state = RESOLVED;
                    this.value = value;
                    this.resolvedCallback.forEach( cb => cb(this.value) )
                }
            } ,0 )
        }
        reject =(value) =>{
            setTimeout( () => {
                if(this.state == PENDING) {
            
                }
            } ,0 )
        }
        then = (onFulled,onRejected) => {
           // if(typeof) 限制参数
           
        }
    }
})(window)
/*
   快速排序的算法： 先选择一个标尺，用它把整个队列过一遍筛选，以保证其左边的元素都不大于它，
   其右边的元素都大于它
*/
class myQuick {
    constructor(arr){
       if(!isArrray(arr)) return;
       this.arr = arr;
       this.tempArr = arr;
    }
    init(){
         if(this.tempArr.length > 1) {  // 判断是否结束
             let a = this.arr.length
         } else {
             return;
         }
       let baseArr = this.arr[0],leftArr =[],RightArr = [];

        for (let i = 1 ; i< a ; i++) {
            if(this.arr[1] > baseArr) {
                RightArr.push (this.arr[i])
            } else {
                leftArr.push (this.arr[i])
            }
        }
        // 进行递归运算
        myQuick.init(RightArr);
        myQuick.init(leftArr);

          // 最后进行合并运算
        this.arr = [...leftArr,baseArr.RightArr];


    }
}
