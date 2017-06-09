var gulp = require('gulp'),
 sass = require('gulp-sass'),
 browserSync = require('browser-sync'),
 del = require('del'),
 autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){
 return gulp.src('app/scss/**/*.scss')
 .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
 .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7']), {cascade: true}) // IE, Safari, Chrome и FF; мобильные Safari (iOS 8), Chrome (Android 5)
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

gulp.task('watch', ['browser-sync'], function() {
 gulp.watch('app/scss/**/*.scss', ['sass']);
 gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('clean', function(){
 return del.sync('app/css')
});

gulp.task('clear', function (callback) {
 return cache.clearAll();
})

gulp.task('default', ['watch']);


