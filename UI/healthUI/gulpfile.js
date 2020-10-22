// var gulp = require("gulp");
// var babel = require("gulp-babel");

// gulp.task('copy', function (done) {
//     gulp.src('./dist/images/**/*')
//         .pipe(gulp.dest('build/images'))    
//         done()
//     gulp.src('./dist/style/**/*')
//         .pipe(gulp.dest('build/style'))    
//         done() 
//     gulp.src('./dist/views/**/*')
//         .pipe(gulp.dest('build/views'))    
//         done();
// })

// gulp.task("js",function () {
//     return gulp.src("dist/**/*.js") // ES6 源码存放的路径
//         .pipe(babel({
//             presets: [""],
//             plugins: ["@babel/plugin-transform-arrow-functions"]
//         })) 
//         .pipe(gulp.dest("build")); // 转换成 ES5 存放的路径
// });

// gulp.task('default',gulp.series('copy','js',function(done){
//     console.log('default');
//     done();
// }));
var gulp = require('gulp');
var concat = require('gulp-concat');        // 合并文件
var uglify = require('gulp-uglify');        // js 压缩
var csso = require('gulp-csso');            // css压缩
var imagemin = require('gulp-imagemin');    // 图片压缩
var clean = require('gulp-clean');          // 清空文件夹
var babel = require('gulp-babel'); // es6=>es5

// 打包css
gulp.task('css', function(){
    return gulp.src('./dist/style/**/*.css')
        .pipe(csso())                   // 压缩优化css
        .pipe(gulp.dest('./build/style'));
});

// 打包其他资源
gulp.task('images', function () {
    return gulp.src('./dist/images/**/*.*')
        // .pipe(imagemin({
        //     progressive: true,
        // }))
        .pipe(gulp.dest('./build/images'));
});
// 编译js
gulp.task('js', function(){
    return gulp.src('./dist/**/*.js')
        .pipe(babel())  
        .pipe(gulp.dest('./build/'));
});
// copy html
gulp.task('copy', function () {
    return gulp.src('./dist/views/**/*')
        .pipe(gulp.dest('./build/views'));
})

// 默认任务
gulp.task('default',gulp.series('css','images','js','copy',function(done){
    console.log('default');
    done();
}));
