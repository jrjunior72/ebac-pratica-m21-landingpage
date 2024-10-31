// gulpfile.js

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

// importar o plugin do gulp-uglify
const imagemin = require('gulp-imagemin');
// const uglify = require('gulp-uglify');


function styles() { // compila sass
    return gulp.src('./src/styles/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('./dist/css'));
}

function images() { // comprime imagens
    return gulp.src('./src/images/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))

        // .pipe(imagemin().on('error', function(err) { // manipulador de erros
        //     console.error('Error in imagemin task', err.toString());
        // }))

        .pipe(gulp.dest('./dist/images'));
}

gulp.task('imagemin', function() {
    return gulp.src('src/images/*')
        .pipe(imagemin().on('error', function(err) {
            console.error('Error in imagemin task', err.toString());
        }))
        .pipe(gulp.dest('dist/images'));
});

exports.default = gulp.parallel(styles, images);

exports.watch = function(){
    gulp.watch('./src/styles/*.scss', gulp.parallel(styles));
    gulp.watch('./src/images/*', {ignoreInitial: false}, gulp.parallel(images));
}

