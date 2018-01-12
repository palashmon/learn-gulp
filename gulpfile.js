const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('hello', () => {
	console.log('Hello World');
});

// Compile Sass to CSS with the help of a plugin called gulp-sass
gulp.task('sass', () => {
	return gulp
		.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
		.pipe(sass()) // Converts Sass to CSS with gulp-sass
		.pipe(gulp.dest('app/css'));
});

// Watching Sass files for changes
gulp.task('watch', () => {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	// Other watchers
});
