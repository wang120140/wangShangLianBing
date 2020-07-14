let getCookie ={
    a:'',
    b:'',
    c:''
} ;

let BJ83T0U0lFrKq1 ,safetycode1;
 getCookie.a = "PHPSESSID=nk3pk3nfrgiaepjkfc5l9qtlg1;"   
 getCookie.b = "BJ83T0U0lFrKq1=20803;"
 getCookie.c = "safetycode1=9871;"
// BJ83T0U0lFrKq1=20803; safetycode1=9871"
// BJ83T0U0lFrKq1=20974; safetycode1=5812"
// "PHPSESSID=46bfl3c739sat5qlim2kpmer35; BJ83T0U0lFrKq1=21027; safetycode1=6158"
 // "PHPSESSID=46bfl3c739sat5qlim2kpmer35; BJ83T0U0lFrKq1=34318; safetycode1=5979"
// "PHPSESSID=46bfl3c739sat5qlim2kpmer35; BJ83T0U0lFrKq1=34317; safetycode1=4422"
// "PHPSESSID=7ipam9dq2qln7c474i08jkb2j5; BJ83T0U0lFrKq1=19952; safetycode1=5987"
// "PHPSESSID=7ipam9dq2qln7c474i08jkb2j5; BJ83T0U0lFrKq1=21331; safetycode1=3233"
// "PHPSESSID=dhve8fn75qcmj9amsuf1pdsdd0; BJ83T0U0lFrKq1=34300; safetycode1=1641"
BJ83T0U0lFrKq1=21293; safetycode1=5377
// "PHPSESSID=nk3pk3nfrgiaepjkfc5l9qtlg1; BJ83T0U0lFrKq1=21043; safetycode1=2582"
// "PHPSESSID=nk3pk3nfrgiaepjkfc5l9qtlg1; BJ83T0U0lFrKq1=20779; safetycode1=7634"
// "PHPSESSID=nk3pk3nfrgiaepjkfc5l9qtlg1; BJ83T0U0lFrKq1=20659; safetycode1=9745"
// "PHPSESSID=nk3pk3nfrgiaepjkfc5l9qtlg1; BJ83T0U0lFrKq1=20818; safetycode1=6548"
// "PHPSESSID=4r0edb0sb49ccalup35icmfh25; BJ83T0U0lFrKq1=33993; safetycode1=4800"
// "PHPSESSID=4r0edb0sb49ccalup35icmfh25; BJ83T0U0lFrKq1=21507; safetycode1=9307"
//  "PHPSESSID=4r0edb0sb49ccalup35icmfh25; BJ83T0U0lFrKq1=27994; safetycode1=5197"
// "PHPSESSID=4r0edb0sb49ccalup35icmfh25; BJ83T0U0lFrKq1=21051; safetycode1=4678"
// "PHPSESSID=4r0edb0sb49ccalup35icmfh25; BJ83T0U0lFrKq1=21051; safetycode1=4678"
// "PHPSESSID=fekdkfnrqoofbcsifvvstj7ul5; BJ83T0U0lFrKq1=20039; safetycode1=6338"
//  "PHPSESSID=719fuli4tfddpg6he84i27fv96; url=%2Findex%2Findex%2Flbindex; BJ83T0U0lFrKq2=35158; safetycode2=6229"
// "PHPSESSID=rknlfsi2bgijd731ki06pi24f6; BJ83T0U0lFrKq1=20982; safetycode1=9804"
// "PHPSESSID=rknlfsi2bgijd731ki06pi24f6; BJ83T0U0lFrKq1=21554; safetycode1=9196"

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
