/**
 * Created by Administrator on 2015/7/9.
 */
/*
 @desc 类似朋友圈向上滑动页面显示正在加载的转圈效果
 @param {Element} slideEle 滑动区域的元素
 @param {Element} loadingEle 显示正在加载效果的元素
 @param {function} fn 当显示正在加载元素及loading效果时要执行的function以便加载数据
 */
var loadMore = (function(){
    return function(slideEle,loadingEle,fn){
        slideEle.addEventListener('touchmove',(function(now){return function(){
            var clientHeight = document.documentElement.clientHeight;

            //加载更多区域(即loading区域)距离屏幕可视区域顶部的距离
            var distance = loadingEle.getBoundingClientRect().top;
            var len = (new Date().getTime()-now)/1000;
            //console.log('时间差为:'+len+'秒');
            if(distance+30<=clientHeight){
                if(!/ pullUp-relative/.test(loadingEle.className)){
                    loadingEle.className +=' pullUp-relative';
                }
                fn();
                now = new Date().getTime();
            }else if(distance>clientHeight&&(len<=2)){
                /*
                 解决滑动的时候由于惯性导致手指离开页面之后页面可能还会向上滑动一段距离,
                 这里设置的延时时间为2秒
                 */
                setTimeout(arguments.callee,100);
            }else{
                now = new Date().getTime();
            }
        };})(new Date().getTime()));
    };
})();