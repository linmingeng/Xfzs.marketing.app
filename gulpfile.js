var gulp = require('gulp')
var gutil = require('gulp-util')
var ftp = require('vinyl-ftp')

gulp.task('ftp', function () {
    var conn = ftp.create({
        host: '118.178.192.111',
        port: 22,
        user: 'administrator',
        password: 'HXZCxfzs0909**&&',
        parallel: 3,
        log: gutil.log
    })

    return gulp.src('dist/**/*')
        .pipe(conn.dest('/'))
})
