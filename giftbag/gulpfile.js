var gulp = require('gulp');
var babel = require("gulp-babel"); //babel
var rename = require("gulp-rename"); //重命名
var minifycss = require('gulp-minify-css'); //css压缩
var uglify = require('gulp-uglify'); //js压缩
var less = require('gulp-less'); //less编译

gulp.task("js", function () {   //js编译任务
	return gulp.src("js/*.js")  
		.pipe(babel({
		            presets: ['es2015']
		        }))
		.pipe(uglify()) 
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest("js/min/"));  
});

gulp.task("less", function() {
	return gulp.src("less/*.less")
		.pipe(less())
		.pipe(minifycss())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest("css/"));
})

gulp.task('watch',function(){
    gulp.watch('less/*.less',['less']);
    gulp.watch('js/*.js',['js'])
})