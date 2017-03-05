/*
* 1.写一个read模块,用来传入url地址,返回读取后的对象数组
* 2.把上面的对象数组保存在数据库中
* 3.建立一个web服务器提示保存的数据库
 * 4.开启一个计划任务每小时更新一次数据库
 * 5.把此项目发布github并且布署阿里云
*
* */
var read=require('./read').movie;
var write=require('./write').movie;
var async=require('async');
var debug=require('debug')('crawl:main');
var url='http://top.baidu.com/buzz?b=26&c=1&fr=topcategory_c1';
var Movie=require('./model').Movie;
async.waterfall([
    function (callback) {  //保存之前将数据全部清空
        Movie.remove({},callback)
    },
    function (data,callback) {
        read(url,callback)
    },
    function (data, callback) {
        write(data,callback);
    }
],function (err, result) {
    debug('完成');
});