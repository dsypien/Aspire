var gulp = require('gulp'),
	browser = require('browser-sync').create(),
	batch = require('gulp-batch'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	stripDebug = require('gulp-strip-debug'),
	uglify = require('gulp-uglify'),
	minify = require('gulp-minify-css'),
	imageOp = require('gulp-image-optimization'),
	clean = require('gulp-clean'),
	jshint = require('gulp-jshint'),
	typescript = require('gulp-tsc'),
	child_process = require('child_process'),
	livereload = require('gulp-livereload');

gulp.task('default', 
	['watch']
);

gulp.task('build', 
	['lint', 'sass', 'compile']
);

gulp.task('build-dist', 
	['lint', 'sass-dist', 'compile-dist']
);

gulp.task('clean', function(){
	return gulp.src(["public/*"])
		.pipe(clean());
});

gulp.task('cts', ['clean-tsc']);

gulp.task('clean-tsc', function(){
	gulp.src(["app/*.js", "app/*js.map"])
		.pipe(clean());

	gulp.src(["app/*/*.js", "app/*/*js.map"])
		.pipe(clean());
});

gulp.task('exec-tsc', function(){
	child_process.execSync('npm run tsc');
});

gulp.task('lint', function(){
	gulp.src(['./public/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'));
});

gulp.task('watch', ['build'], function () {  
	livereload.listen();  
	gulp.watch(['./app/*/*.ts', './app/**/*.html','./app/**/*.scss'], batch(function (events, done) {
		gulp.start('build', done);
	}));
});

gulp.task('browser-sync', function() {
//    browser.init({
//        proxy: {
//            target: '127.0.0.1:3000'
//        }
//    });
});

gulp.task('compile', ['clean', 'exec-tsc'], function(){
	gulp.src(['./app/boot.js', './app/*/*.js', './app/*/*.html'])
		.pipe(gulp.dest('./public/app'));

	// 3rd party dependencies
	gulp.src([
			"./node_modules/bootstrap/dist/css/bootstrap.min.css",
			"./bower_components/jquery/dist/jquery.min.js",
			"./node_modules/bootstrap/dist/js/bootstrap.min.js",
			"./node_modules/angular2/bundles/angular2-polyfills.js",
			"./node_modules/systemjs/dist/system.src.js",
			"./node_modules/rxjs/bundles/Rx.js",
			"./node_modules/angular2/bundles/angular2.dev.js",
			"./node_modules/angular2/bundles/router.dev.js",
			"./node_modules/angular2/bundles/http.dev.js"
		]).pipe(gulp.dest('./public/dep'));

	gulp.src([
			"./node_modules/bootstrap/fonts/*"
		]).pipe(gulp.dest('./public/fonts'));

	gulp.src(['./app/*.html'])
		.pipe(gulp.dest('./public/'));

	gulp.src(['./app/assets/imgs/*'])
		.pipe(gulp.dest('./public/imgs'));

});

gulp.task('compile-dist', ['clean'], function(){
	gulp.src(['./app/boot.ts', './app/*/*.ts'])
		.pipe(typescript({experimentalDecorators: true}))
		.pipe(gulp.dest('./app/build'));

	gulp.src(['./app/build/boot.js', './app/build/*/*.js'])
		.pipe(uglify())
		.pipe(stripDebug())
		.pipe(gulp.dest('./public'));

	gulp.src(['./app/components/assets/*'])
		.pipe(gulp.dest('./public/assets/'));
});
 
gulp.task('sass', function () {
	gulp.src('./app/assets/styles/*.scss')
	.pipe(sass().on('error', sass.logError))
		.pipe(concat('bundled.css'))
		.pipe(gulp.dest('./public'));
});

gulp.task('sass-dist', function () {
	gulp.src('./app/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(minify())
		.pipe(concat('bundled.css'))
		.pipe(gulp.dest('./public'));
});
 
gulp.task('sass:watch', function () {
	gulp.watch('./sass/**/*.scss', ['sass']);
});