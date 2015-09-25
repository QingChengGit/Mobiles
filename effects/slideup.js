/**
 * Created by Administrator on 2015/9/9.
 */
/*
 @desc 类似朋友圈向上滑动页面显示正在加载的转圈效果
 @param {Element} slideEle 滑动区域的元素
 @param {Element} loadingEle 显示正在加载效果的元素
 @param {function} fn 当显示正在加载元素及loading效果时要执行的function以便加载数据
 */
define(function(){
    var loadMore = (function(){
        return function(slideEle,loadingEle,fn){
            var startY = 0,
                endY = 0,
                //滑动方向
                slideOrient = null,
                timer,
                clientHeight = document.documentElement.clientHeight,
                //表示回调函数fn是否执行完毕
                isExecuted = false;
            slideEle.addEventListener('touchstart',function(evt){
                startY = evt.touches[0].pageY;
            },false);
            slideEle.addEventListener('touchmove',(function(now){return function(event){
                var arg = arguments;
                if(slideOrient){
                    endY = event.touches[0].pageY;
                    if(endY-startY>0){
                        //表面用户是向下滑动屏幕直接return;
                        return;
                    }else{
                        slideOrient = 'up';
                    }
                }

                //加载更多区域(即loading区域)距离屏幕可视区域顶部的距离
                var distance = loadingEle.getBoundingClientRect().top;
                var len = (new Date().getTime()-now)/1000;
                //console.log('时间差为:'+len+'秒');
                if(distance+30<=clientHeight && !isExecuted){
                    if(!/ pullUp-relative/.test(loadingEle.className)){
                        loadingEle.className +=' pullUp-relative';
                    }
                    fn();
                    now = new Date().getTime();
                    isExecuted = true;
                }else if(distance>clientHeight&&(len<=2)){
                    /*
                     解决滑动的时候由于惯性导致手指离开页面之后页面可能还会向上滑动一段距离,
                     这里设置的延时时间为2秒
                     */
                    if(timer){
                        return false;
                    }
                    isExecuted = false;
                    timer = setTimeout(function(){
                        clearTimeout(timer);
                        timer = null;
                        arg.callee();
                    },100);
                }else{
                    now = new Date().getTime();
                }
            };})(new Date().getTime()));
            slideEle.addEventListener('touchend',function(evt){
                //重置滑动方向的值为null
                slideOrient = null;
            },false);
        };
    })();
    return loadMore;
});