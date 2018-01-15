const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');

// Our first task
gulp.task('hello', () => {
	console.log('Hello World');
});

// Create a browserSync task to enable Gulp to spin up a server using Browser Sync
gulp.task('browserSync', () => {
	browserSync.init({
		server: {
			baseDir: 'dist'
		}
	});
});

// Create task to Optimizing CSS and JavaScript files
gulp.task('useref', () =>
	gulp
		.src('app/*.html')
		.pipe(useref())
		.pipe(gulpIf('*.js', uglify())) // Minifies only if it's a JavaScript file
		.pipe(gulpIf('*.css', cssnano())) // Minifies only if it's a CSS file
		.pipe(gulp.dest('dist'))
);

// Compile Sass to CSS with the help of a plugin called gulp-sass
gulp.task('sass', () =>
	gulp
		.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
		.pipe(sass()) // Converts Sass to CSS with gulp-sass
		.pipe(gulp.dest('app/css'))
		.pipe(
			browserSync.reload({
				stream: true
			})
		)
);

gulp.task('images', () =>
	gulp
		.src('app/images/**/*.+(png|jpg|gif|svg)')
		.pipe(cache(imagemin())) // Caching images that ran through imagemin
		.pipe(gulp.dest('dist/images'))
);

gulp.task('fonts', () => {
	return gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/fonts'));
});

// Watching Sass files for changes
// browserSync and sass must be completed before watch is allowed to run.
gulp.task('watch', ['browserSync', 'sass', 'useref'], () => {
	gulp.watch('app/scss/**/*.scss', ['sass']);

	// Reloads the browser whenever HTML or JS files change
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});
