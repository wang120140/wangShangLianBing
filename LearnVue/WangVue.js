class WangVue {
    // 先定义WangVue类
    constructor(option) {
      this.$el = option.el;
      this.$data = option.data;
      this.$options = option;
      // 第一步先编译模板
      // 第二步创建观察者模式
      // 第三部 使用代理模式进行操作
      if(this.$el){
          new Compiler(this.$el,this);
          new Observer(this.$data);
          this.proxyData(this.$data)
      }  
    }
    proxyData(data){
      
    }
}
// 编译模板
class Compiler {
    constructor(el,vm){
      this.el = this.isElementNode(el) ? el : document.querySelector(el);
      this.vm = vm;
      // 先把文档放到文档片段里面
      const fragment = this.nodeFragment(this.el);
      // 对文档进行编译
      this.compile(fragment);
      this.el.appendChild(fragment);
    }
    compile(fragments){
        const childrenNode = fragments.childNodes;
        [...childrenNode].forEach( child => {
        // 区分元素节点还是文本节点
        if(this.isElementNode(child)){
            this.compileElement(child)
        } else {
            console.log(child)
            this.complieText(child)
        }
        // 对于深层元素进行递归遍历
        if(child.childNodes && child.childNodes.length){
            this.compile(child)
        }
        } )
    }
    compileElement (node) {
      let attributes = node.attributes ;
      //console.log(attributes);
      [...attributes].forEach( attr => {
          // console.log(attr)
          let {name , value} = attr;
        // 区分是指令还是事件
        
        if(this.isDirector(name)) {
          let [ , directive] = name.split('-');// 删除掉v-
          let [compileKey,deailStr] = directive.split(":")// 处理掉事件函数
           // console.log(compileUtil)
           ///console.log(compileUtil[compileKey])
           // console.log(compileKey)
          compileUtil[compileKey](node,value,this.vm,deailStr);
        } else if(this.isEventName(name)){ // 这个处理特殊的@
          
        }
      } )
    }
    complieText (node) {
     const content = node.textContent;
     if(/\{\{(.+?)\}\}/.test(content)){
         compileUtil["text"](node,content,this.vm)
     }
    }
    isEventName(attrName){
        return attrName.startsWith("@")
    }
    isDirector(attrName){
        return attrName.startsWith("v-")
    }
    // 先把文档放到文档片段里面
    nodeFragment(el){
      const f = document.createDocumentFragment();
      let firstChild;
      while (firstChild = el.firstChild){
        f.appendChild(firstChild)
      }
      return f;
    }
    isElementNode(node) {
        return node.nodeType === 1;
    }
}
// 编译模板具体指令
const compileUtil = {
    text (node ,expr,vm) {
        let value;
        if(expr.indexOf('{{')!==-1){
            value = expr.replace(/\{\{(.+?)\}\}/g, (...args)=>{
                // text的 Watcher应在此绑定，因为是对插值{{}}进行双向绑定
                // Watcher的构造函数的 getOldVal()方法需要接受数据或者对象，而{{person.name}}不能接收
                // new Watcher(args[1], vm, ()=>{
                //     this.updater.textUpdater(node, this.getContent(expr, vm));
                // });
                return this.getValue(args[1], vm);
            });
        }else{
            value = this.getValue(expr, vm);
        }
        this.updater.textUpdater(node, value); 
    },
    html (node, expr,vm) {
        let value = this.getValue(expr, vm);
        this.updater.htmlUpdater(node, value);
    },
    model (node, expr,vm) {
        const value = this.getValue(expr, vm);
        // v-model绑定对应的 Watcher, 数据驱动视图
      
        // 视图 => 数据 => 视图
        node.addEventListener('input', (e)=>{
            this.setVal(expr, vm, e.target.value);
        })
        this.updater.modelUpdater(node, value);
    },
    on  (node,expr,vm, detailStr) {
        let fn = vm.$options.methods && vm.$options.methods[expr];
        node.addEventListener(detailStr,fn.bind(vm), false);
    },
    bind (node,expr,vm,detailStr) {
        node.setAttribute(detailStr, expr);
    },
    updater: {
        textUpdater(node,value) {
            node.textContent = value;
        },
        htmlUpdater(node,value) {
            node.innerHTML = value;
        },
        modelUpdater(node,value) {
            node.value = value;
        }
    },
    getValue(expr, vm){
        // 处理 person.name 这种对象类型，取出真正的value
        return expr.split('.').reduce((data,currentVal)=>{
            return data[currentVal];
        }, vm.$data)
    },
    setVal(expr, vm, inputValue){
        expr.split('.').reduce((data,currentVal)=>{
            data[currentVal] = inputValue;
        }, vm.$data)
    },
    getContent(expr, vm){
        // {{person.name}}--{{person.age}}
        // 防止修改person.name使得所有值全部被替换
        return expr.replace(/\{\{(.+?)\}\}/g, (...args)=>{
            return this.getValue(args[1], vm);
        });
    },
}
class Observer {
    constructor() {

    }
}