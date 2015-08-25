/**
 * Created by Administrator on 2015/8/25.
 */
({
    appDir:'./',
    baseUrl: './libs',
    dir: '../release/js',
    modules: [

    ],
    fileExclusionRegExp: /^(r|build|less.min)\.js$/,
    optimizeCss: 'standard',
    removeCombined: true,
    paths: {
        libs:'./',
        services:'../services',
        config:'../config',
        chart: 'chart',
        zepto: 'zepto',
        mobiscroll_002: 'mobiscroll_002',
        mobiscroll: 'mobiscroll'
    },
    shim: {
        'chart':{
            exports:'Chart'
        },
        'zepto':{
            exports:'$'
        },
        'mobiscroll_002':['zepto'],
        'mobiscroll':['mobiscroll_002']
    }
})