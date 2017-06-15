var gulp       = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    concat       = require('gulp-concat'),
    uglifyjs     = require('gulp-uglifyjs'),
    uglifycss    = require('gulp-uglifycss'),
    htmlminfy      = require('gulp-minify-html'),
    cssnano      = require('gulp-cssnano'),
    rename       = require('gulp-rename'),
    del          = require('del'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    cache        = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint       = require('gulp-jshint');


gulp.task('sass', function(){
   return gulp.src('app/scss/**/*.scss')
     .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
     .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7']), {cascade: true})
     .pipe(gulp.dest('app/css'))
     .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function(){
   browserSync({
      server: {
       baseDir: 'app'
      },
      notify: false
   });
});

gulp.task('js', function() {
    return gulp.src('app/js/main.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglifyjs())
        .pipe(gulp.dest('dist/js'))
});

gulp.task('css', function() {
    return gulp.src('app/css/style.css')
        .pipe(uglifycss())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('html', function() {
    return gulp.src('app/*.html')
        .pipe(htmlminfy())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/main.js', browserSync.reload);
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['clean', 'img', 'sass', 'js', 'css', 'html'], function() {

    // var buildCss = gulp.src('app/css/style.css')
    //     .pipe(gulp.dest('dist/css'))

    // var buildHtml = gulp.src('app/*.html')
        //     .pipe(gulp.dest('dist'));

    var buildFonts = gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src(['app/js/**/*', '!app/js/main.js'])
        .pipe(gulp.dest('dist/js'))
});

gulp.task('clear', function (callback) {
   return cache.clearAll();
})

gulp.task('default', ['watch']);


