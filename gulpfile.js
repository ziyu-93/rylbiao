let gulp = require('gulp'); //gulp
let imagemin = require('gulp-imagemin'); //img
let minifyCss = require('gulp-minify-css'); //css
let babel = require('gulp-babel'); //es6=>es5
let uglify = require('gulp-uglify'); //js
let htmlmin = require('gulp-htmlmin'); //html
let watch = require('gulp-watch'); //检测
let cleanCSS = require('gulp-clean-css') //运行出错了。看网上的是压缩合并后的css
let browserSync = require('browser-sync'); //启动了localhost:9000服务器
let webserver = require('gulp-webserver') //启动了localhost:8000服务器
let concat = require('gulp-concat'); //多个文件合并为一个
let sass = require('gulp-sass'); //scss;sass
var sourcemaps = require('gulp-sourcemaps'); //sass;scss
//scss => css
//gulp-sourcemaps sass
// gulp.task("scss", () => {
//   gulp.src("src/scss/*.scss").pipe(sourcemaps.init()).pipe(sass()).pipe(sourcemaps.write("./")).pipe(gulp.dest("dist/css"))
// })
//gulp-sass
gulp.task('scss', () => {
  gulp.src("src/scss/*.scss").pipe(sass().on('error', (err) => {
    console.log(err);
  })).pipe(gulp.dest('dist/css'))
})

//压缩js
gulp.task('jsmin', () => {
  return gulp.src('src/js/*.js')
    //.pipe(concat('main.js')) //合并成同一个文件
    .pipe(uglify().on('error', (e) => {
      console.log(e)
    }))
    .pipe(gulp.dest('dist/js'))
});

//es6 => es5
gulp.task('es5', () => {
  return gulp.src('src/js/*.js').pipe(babel())
    .pipe(gulp.dest('es5/js'))
});



//压缩css
gulp.task('css', () => {
  return gulp.src('src/css/*.css').pipe(minifyCss()).pipe(gulp.dest('dist/css'))
});

//压缩html
let version = (new Date).valueOf() + '';
gulp.task('html', () => {
  return gulp.src('src/main/*.html').pipe(htmlmin({
    collapseWhitespace: true,
    removeEmptyAttributes: false,
    minifyJS: false, //压缩页面里的JS
    minifyCSS: false, //压缩页面里的CSS
    removeComments: true
  }))
    //.pipe(replace('.css">', '.css?v=' + version + '">'))
    .pipe(gulp.dest('dist/main'))
});

//压缩图片
gulp.task('image', () => {
  return gulp.src('src/img/*.{png,jpg,jpeg,gif}').pipe(imagemin({
    optimizationLevel: 3,
    progressive: true,
    interlaced: true
  }).on('error', (e) => {
    console.log(e);
  })).pipe(gulp.dest('dist/img'))
})

//运行gulp默认压缩内容
gulp.task("default", [
  'html',
  'image',
  'jsmin',
  'scss'
], () => {
  //启动服务器
  // browserSync({
  //   notify: false,
  //   port: 8000,
  //   server: {
  //     baseDir: ['dist'],
  //     routes: {
  //       '/bower_components': 'bower_components'
  //     }
  //   }
  // });
  console.log("success")
});

// 热更新
gulp.task('webserver', function() {
  gulp.src('dist').pipe(webserver({
    livereload: true,
    open: true,
    port: 8020
  }))
});

// collapseWhitespace: true,
// removeEmptyAttributes: false
// const reload = browserSync.reload;
// gulp.watch(['src/css/*.css', 'src/main/*.html', 'src/img/*.{png,jpg,gif}', 'src/js/*.js', 'es5/js/*.js']).on('change', reload);

//监听
gulp.task('watch', () => {
  gulp.watch('src/js/*.js', ['jsmin']);
  gulp.watch('src/scss/*.scss', ['scss']);
  gulp.watch('src/main/*.html', ['html']);
  gulp.watch('src/img/*.{png,jpg,jpeg,gif}', ['image']);
  gulp.src('dist').pipe(webserver({
    livereload: true,
    open: true,
    port: 8020
  }))
});
