let getCookie ={
    a:'',
    b:'',
    c:''
} ;

getCookie.a = "PHPSESSID=t7e4meo6msqn8b8tfu6sfc0hc1;"   
getCookie.b = "BJ83T0U0lFrKq1=21266"
getCookie.c = "safetycode1=1063"
export default getCookie;

// BJ83T0U0lFrKq1=21266; safetycode1=1063;
//  BJ83T0U0lFrKq1=21264; safetycode1=6017
// BJ83T0U0lFrKq1=34322; safetycode1=9940;
// BJ83T0U0lFrKq1=21507; safetycode1=4696;
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