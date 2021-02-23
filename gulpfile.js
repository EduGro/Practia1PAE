let gulp = require('gulp');
let sass = require('gulp-sass');
let ts = require('gulp-typescript');
let webserver = require('gulp-webserver');

const buildPath = 'dist';

gulp.task('styles', function(){
    return gulp.src('src/**/*.scss') //origen
        .pipe(sass()) //transform
        .pipe(gulp.dest(buildPath + '/assets/styles')) ;//destino
})


gulp.task('watch:styles', gulp.series('styles', function(done){
    gulp.watch('src/**/*.scss', gulp.series('styles'));
    done();
}))


gulp.task('scripts', function(){
    let tsConfig = ts.createProject('tsconfig.json');
    return tsConfig.src() //origen
        .pipe(tsConfig()) //transform
        .pipe(gulp.dest(buildPath + '/assets/scripts')); //destino
})

gulp.task('watch:scripts', gulp.series('scripts', function(done){
    gulp.watch('src/**/*.ts', gulp.series('scripts'));
    done();
}))

gulp.task('html', function(){
    return gulp.src('src/*.html') //origen
        .pipe(gulp.dest(buildPath)); //destino
})


gulp.task('watch:html', gulp.series('html', function(done){
    gulp.watch('src/**/*.html', gulp.series('html'));
    done();
}))


gulp.task('serve', function(){
    return gulp.src(buildPath) //origen
        .pipe(webserver({
            open: true,
            livereload: true
        })) //destino
});

gulp.task('default', gulp.parallel('watch:styles', 'watch:scripts', 'watch:html', 'serve'));