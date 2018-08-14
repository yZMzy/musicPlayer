var gulp = require('gulp');
var connect = require('gulp-connect');
var less = require('gulp-less')

//node 流的概念
//把src的html放到dist下面
gulp.task("html",function(){


    gulp.src('./src/index.html')
        .pipe(connect.reload())
        .pipe(gulp.dest('./dist'))
});
//监听文件变化
gulp.task("watch",function(){
    gulp.watch('./src/index.html',['html']);
    gulp.watch('./src/less/*.less',['less']);
    gulp.watch('./src/js/*.js',['js'])
})
//开启服务器
gulp.task("server",function (){
    connect.server({
        root : "./dist",
        port : 8091,
        livereload : true //自动刷新
    })
})
//把less转换成css
gulp.task("less",function() {

    gulp.src("./src/less/*.less")//*所有的less
        .pipe(connect.reload())
        .pipe(less())
        .pipe(gulp.dest("./dist/css"))
})
//转移js
gulp.task('js',function(){
    gulp.src('./src/js/*.js')
    .pipe(gulp.dest('./dist/js'))

})
gulp.task("default",["html","watch","server","less","js"])
