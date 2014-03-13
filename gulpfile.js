var gulp       = require('gulp')
  , concat     = require('gulp-concat')
  , uglify     = require('gulp-uglify')
  , livereload = require('gulp-livereload');

gulp.task('concat', function () {
  gulp.src([
    // Wysihtml5 parser rules
    'bower_components/wysihtml5/parser_rules/advanced.js'

    // Wysihtml5 library
  , 'bower_components/wysihtml5/dist/wysihtml5-0.3.0.js'

    // Editor plugin
  , 'js/editor.js'

    // Plugin initialization
  , 'js/initialize.js'
  ])
    .pipe(uglify())
    .pipe(concat('editor.min.js'))
    .pipe(gulp.dest('js'))
    .pipe(livereload());
});

gulp.task('watch', function () {
  gulp.watch(['js/**/*.js', '!js/editor.min.js'], ['concat']);
});
