/**
 * Created by Administrator on 2015/7/9.
 */
/*
 @desc ��������Ȧ���ϻ���ҳ����ʾ���ڼ��ص�תȦЧ��
 @param {Element} slideEle ���������Ԫ��
 @param {Element} loadingEle ��ʾ���ڼ���Ч����Ԫ��
 @param {function} fn ����ʾ���ڼ���Ԫ�ؼ�loadingЧ��ʱҪִ�е�function�Ա��������
 */
var loadMore = (function(){
    return function(slideEle,loadingEle,fn){
        slideEle.addEventListener('touchmove',(function(now){return function(){
            var clientHeight = document.documentElement.clientHeight;

            //���ظ�������(��loading����)������Ļ�������򶥲��ľ���
            var distance = loadingEle.getBoundingClientRect().top;
            var len = (new Date().getTime()-now)/1000;
            //console.log('ʱ���Ϊ:'+len+'��');
            if(distance+30<=clientHeight){
                if(!/ pullUp-relative/.test(loadingEle.className)){
                    loadingEle.className +=' pullUp-relative';
                }
                fn();
                now = new Date().getTime();
            }else if(distance>clientHeight&&(len<=2)){
                /*
                 ���������ʱ�����ڹ��Ե�����ָ�뿪ҳ��֮��ҳ����ܻ������ϻ���һ�ξ���,
                 �������õ���ʱʱ��Ϊ2��
                 */
                setTimeout(arguments.callee,100);
            }else{
                now = new Date().getTime();
            }
        };})(new Date().getTime()));
    };
})();