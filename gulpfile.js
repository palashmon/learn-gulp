const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('hello', () => {
	console.log('Hello World');
});

gulp.task('sass', () => {
	return gulp
		.src('app/scss/styles.scss')
		.pipe(sass()) // Converts Sass to CSS with gulp-sass
		.pipe(gulp.dest('app/css'));
});
