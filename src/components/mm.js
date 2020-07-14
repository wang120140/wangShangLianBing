//给出一道前端题，满足如下功能：
//1. 可以添加任务，任务包含任务数据，任务触发的北京时间点。
//2. 在任务到达触发时间点时，触发执行此任务。
//3. 任务的触发时间可以接受 1s 的延迟。
var taskQueue = {   
   _queue: [],
   _ctr:true, 
   timeInterviw:1000,  
  init: function() {
    let timestamp = new Date().getTime()
    (timeOut) && clearTimeout(timeOut);
    var timeOut = setTimeout(() => {        
        this._queue.forEach( (item,index) => {
            if(this._ctr) {
              var tempTime = [];
              tempTime.push(item.timestamp)          
            }
            if(item.timestamp >= timestamp-500 && item.timestamp <= timestamp+500) {
                item.taskFun();
                this._queue.splice(index,1)
                item = null ;              
            }
        }  )
        if(timestamp > Math.max.apply(null,timestamp)+1500) {

           Object.key(taskQueue).forEach( (item) => {
             taskQueue[item] = null ;
           } )
           taskQueue = null ;

           if(tempTime) {
             tempTime.forEach( (item) => {
               item = null;
             } )
           }
           tempTime = null ;
           
           (timeOut) && clearTimeout(timeOut);
           return  // 已经过期
        } else if(timestamp < Math.min.apply( null,timestamp )-2000) {
            _this._ctr = false;  // 跳过时间差
            this.timeInterviw = timestamp -Math.min.apply( null ,timestamp ) -1500
        } else {
          _this._ctr = false;
          _this.timeInterviw = 1000
        }
        this.init();
    }, this.timeInterviw);
  },    
  add: function(taskFun, timestamp) {
    this._queue.push({taskFun,timestamp})
  },    
  
};