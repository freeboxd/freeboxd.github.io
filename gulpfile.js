var gulp = require('gulp');
var nib = require('nib')();
var rupture = require('rupture')();
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var htmlmin = require('gulp-htmlmin');
var stylus = require('gulp-stylus');
var jeet = require('jeet')();
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var jsonMinify = require('gulp-jsonminify');

var srcPaths = {
	html: 'src/**/*.html',
	css: 'src/css/**/*',
	styl: 'src/styl/style.styl',
	js: 'src/js/**/*.js',
	data: 'src/js/data/**/*.json',
	images: 'src/images/*',
	vendors: [
	'node_modules/jquery/dist/jquery.min.js',
	'node_modules/fullpage.js/dist/jquery.fullpage.min.js'
	]
};

var buildPaths = {
	html: 'build/',
	css: 'build/css',
	js: 'build/js',
	data: 'build/js/data',
	images: 'build/images',
	vendors: 'build/js/vendors'
};

var reload = browserSync.reload;

function refresh() {
  setTimeout(function () {
    reload();
  }, 500);
}

function onError(err) {
  console.log(err);
  this.emit('end');
}

gulp.task('html', function() {
	gulp.src(srcPaths.html)
	.pipe(plumber())
	.pipe(htmlmin({colapseWhitespace: true}))
	.pipe(gulp.dest(buildPaths.html));
});

gulp.task('css', function() {
	gulp.src(srcPaths.styl)
	.pipe(plumber())
	.pipe(stylus({ 'include css': true, use: [nib, jeet, rupture] }))
	.pipe(concat('styles.css'))
	.pipe(cleanCSS({ compatibility: 'ie8' }))
	.pipe(gulp.dest(buildPaths.css));
});

gulp.task('js', function() {
	gulp.src(srcPaths.js)
	.pipe(plumber())
	.pipe(concat('app.js'))
	.pipe(uglify())
	.pipe(gulp.dest(buildPaths.js));
});

gulp.task('json', function() {
	gulp.src(srcPaths.data)
	.pipe(plumber())
	.pipe(concat('data.json'))
	.pipe(jsonMinify())
	.pipe(gulp.dest(buildPaths.data));
});

gulp.task('vendors', function() {
	gulp.src(srcPaths.vendors)
	.pipe(plumber())
	.pipe(concat('vendors.js'))
	.pipe(uglify())
	.pipe(gulp.dest(buildPaths.vendors));
});

gulp.task('images', function() {
	gulp.src(srcPaths.images)
	.pipe(plumber())
	.pipe(imagemin({
			optimizationLevel: 3,
      progressive: true,
      interlaced: true
	}))
	.pipe(gulp.dest(buildPaths.images));
});

gulp.task('serve', function() {
	browserSync.init({
    server: {
      baseDir: "./build/",
      online: true
      }
  });

  gulp.watch(srcPaths.html, ['html', refresh]);
	gulp.watch(srcPaths.styl, ['css', refresh]);
	gulp.watch(srcPaths.js, ['js', refresh]);
	gulp.watch(srcPaths.data, ['json', refresh]);
	gulp.watch(srcPaths.images, ['images', refresh]);

});

gulp.task('watch', function(){
	gulp.watch(srcPaths.html, ['html']);
	gulp.watch(srcPaths.styl, ['css']);
	gulp.watch(srcPaths.js, ['js']);
	gulp.watch(srcPaths.data, ['json', refresh]);
	gulp.watch(srcPaths.images, ['images', refresh]);
});

gulp.task('build', ['html', 'css', 'vendors', 'js', 'json', 'images']);
gulp.task('default', ['html', 'css', 'vendors', 'js', 'json', 'images', 'serve']);