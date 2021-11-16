const gulp = require('gulp');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');

exports.default = () => (
    gulp.src('src/static/*')
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
        .pipe(gulp.dest('images'))
        .pipe(webp())
        .pipe(gulp.dest('images'))
);