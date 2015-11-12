var gulp = require('gulp'),
	webserver = require('gulp-webserver'),
	stylus= require('gulp-stylus'),
  newer = require('gulp-newer'),
  nib = require('nib'),
  imagemin= require('gulp-imagemin'),
	minify = require('gulp-minify-css'),
	watch = require('gulp-watch'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer');


var config = {

	styles: {
		main: './src/styles/main.styl',
		watch : './src/styles/**/*.styl',
		output: './build/css'
	},
	html: {
    main : './src/',
		watch : './src/*.html'
	},
  images: {
    watch: './src/images/*',
    output: './build/images/'
  },
  scripts: {
    main: './src/scripts/main.js',
    watch: './src/scripts/**/*.js',
    output: './build/js'
  }
}

// Server

gulp.task('server',function() {
    // content
    gulp.src('./build')
      .pipe(webserver({
      	host:'0.0.0.0',
      	port: 9000,
      	livereload: true
      }))
});

gulp.task('imagemin', function(){


    gulp.src(config.images.watch)
      .pipe(newer(config.images.watch))
      .pipe(imagemin({progressive: true}))
      .pipe(gulp.dest(config.images.output))

  });

gulp.task('build:js', function(){
    return browserify(config.scripts.main)
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest(config.scripts.output));

  });

gulp.task('build:css', function() {
    // content
    gulp.src(config.styles.main)
      .pipe(stylus({
      	use: nib(),
      	'include css': true
      }))
      .pipe(minify())
      .pipe(gulp.dest(config.styles.output));
});

gulp.task('build:html', function(){
  gulp.src(config.html.watch)
    .pipe(gulp.dest('./build'))

  });

gulp.task('watch', function() {
    // content
    gulp.watch(config.styles.watch, ['build:css']);
    gulp.watch(config.html.watch, ['build:html']);
    gulp.watch(config.scripts.watch, ['build:js']);
    gulp.watch(config.images.watch, ['imagemin']);
});

gulp.task('build',['build:css','build:js']);

gulp.task('default',['server', 'watch','build'], function() {
    // content
});