var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sourcemaps = require('gulp-sourcemaps');
var tslint = require('gulp-tslint');
var tsc = require('gulp-typescript');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gconfig = require('./gulp.config')();
var tsProject = tsc.createProject('tsconfig.json');
var started = false;

/**
 * Create tslint task for checking the quality of our TypeScript code
 * @param  {string} 'ts-lint' Task name
 * @param  {function} callback
 */
gulp.task('ts-lint', function () {
   return gulp.src(gconfig.tsFiles)
        .pipe(tslint())
        .pipe(tslint.report('prose', {
            emitError: false
        }));
});

/**
 * Create compile TypeScript files task
 * @param  {string} 'compile-ts' Task name
 * @param  {function} callback 
 */
gulp.task('compile-ts', function () {
    // Assign source files
    var sourceTsFiles = [
        gconfig.tsFiles,
        gconfig.typingFiles
    ];

    return gulp.src(sourceTsFiles)
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject))
        .js.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(gconfig.outDir));
            /*.pipe(uglify())
            .pipe(rename({ extname: '.min.js' }))
            .pipe(gulp.dest(gconfig.outDir));*/
});

/**
 * Create task for minifying JS files in output directory
 * @param  {any} 'minify-js'
 * @param  {any} function(
 */
gulp.task('minify-js', function () {
    gulp.src(gconfig.outJsFiles)
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(gconfig.outDir));
});

// Serve
gulp.task('serve', ['ts-lint', 'compile-ts'], function () {
    gulp.watch([gconfig.tsFiles], ['ts-lint', 'compile-ts']);
});

// Set up Nodemon for automatically run and restart our app
gulp.task('nodemon', function (cb) {	
	return nodemon({
		script: './bin/www'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	});
});

// Default
gulp.task('default', ['serve', 'nodemon']);