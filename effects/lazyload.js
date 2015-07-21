/**
 * Created by Administrator on 2015/7/20.
 */
/*
    @desc 页面图片懒加载效果(简单版)，虽然不完善，但是希望原理想法可以借鉴被需要
    的少年参考，大神路过希望能多多教诲不胜感激!
    @param {[Element]} context 指定需要懒加载图片的context上下文环境，默认为document
    @param {[Element]} lazyClassName 通过lazyClassName找到需要懒加载效果的元素，默认为"lazy"
 */
var lazyload = (function(g,dc){
    //needPrefix(事件类型前面是否需要加on前缀)如果为true则表明是通过addEventListener方法添加的事件
    var needPrefix = !("addEventListener" in g),
        isMobile = /AppleWebKit.*Mobile/i.test(navigator.userAgent),
        clientHeight = document.documentElement.clientHeight,
        isMove = false,
        startTime;
    function lazyload(context,lazyClassName){
        context = context||dc;
        lazyClassName = lazyClassName||"lazy";
        var eventName = needPrefix?"attachEvent":"addEventListener",
            eventMoveType = isMobile?"touchmove":"scroll";
        if(isMobile){
            context[eventName](needPrefix?"ontouchstart":"touchstart",start,false);
            context[eventName](needPrefix?"on"+eventMoveType:eventMoveType,function(event){handler.call(context,arguments,context,lazyClassName)},false);
        }
        else{
            //PC端
            g[eventName](needPrefix?"on"+eventMoveType:eventMoveType,function(event){handler.call(context,arguments,context,lazyClassName)},false);
        }
    }
    function start(e){
        startTime = new Date().getTime();
        isMove = false;
    }
    function handler(e,context,name){
        if(isMove)return;
        isMove = true;
    //querySelectorAll方法IE8已经支持了，基本上不用做兼容性处理
        var lazys = context.querySelectorAll("."+name),
            args = arguments,
            self = this;
        for(var i = 0,len = lazys.length;i<len;i+=1){
            var rectHeight = lazys[i].getBoundingClientRect().top,
                src = lazys[i].getAttribute('data-original'),
                isComplete = lazys[i].getAttribute('lazy-complete');
            if(isComplete){
                continue;
            }
            if(rectHeight<clientHeight){
                setTimeout((function(lazy,path) {
                    return function(){
                        if (lazy.nodeName.toLowerCase() == 'img') {
                            lazy.src = path;
                        } else {
                            lazy.style.background = "url(" + path + ") no-repeat";
                        }
                        lazy.setAttribute('lazy-complete','');
                    }
                })(lazys[i],src),800);
            }
        }
        if(isMobile){
            var endTime = new Date().getTime();
            if((endTime-startTime)/1000<=1){
                isMove = false;
                setTimeout(function(){handler.apply(self,args)},200);
            }
        }
        isMove = false;
    }
    return lazyload;
}(this,document));
