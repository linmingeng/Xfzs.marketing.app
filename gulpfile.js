var gulp = require('gulp')
var gutil = require('gulp-util')
var ftp = require('vinyl-ftp')

gulp.task('ftp', function () {
    var conn = ftp.create({
        host: 'vote.hxzcgf.cn',
        port: 215,
        user: 'vote.app',
        password: '96e7921E965eL72c92a549dd5a330112',
        parallel: 3,
        log: gutil.log
    })

    return gulp.src('dist/**/*')
        .pipe(conn.dest('/'))
})
