const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('hello', () => {
	console.log('Hello World');
});

gulp.task('sass', () => {
	return gulp
		.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
		.pipe(sass()) // Converts Sass to CSS with gulp-sass
		.pipe(gulp.dest('app/css'));
});
