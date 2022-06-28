const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();


function scssTask(){
  return src('resource/scss/style.scss',{ sourcemaps: '.' })
    .pipe(sass())
    .pipe(dest('app', { sourcemaps: '.' }));
}
function cssminifyTask(){
  return src('app/style.css', { sourcemaps: '.' })
  .pipe(sass())
  .pipe(postcss([cssnano()]))
  .pipe(dest('dist', { sourcemaps: '.' }));
}
function jsTask(){
  return src('resource/js/script.js', { sourcemaps: '.' })
    .pipe(terser())
    .pipe(dest('dist', { sourcemaps: '.' }));
}

function browsersyncServe(cb){
  browsersync.init({
    server: {
      baseDir: '.'
    }
  });
  cb();
}

function browsersyncReload(cb){
  browsersync.reload();
  cb();
}


function watchTask(){
  watch('*.html', browsersyncReload);
  watch(['resource/scss/**/*.scss', 'resource/js/**/*.js'], series(scssTask,cssminifyTask, jsTask, browsersyncReload));
}


exports.default = series(
  scssTask,
  jsTask,
  browsersyncServe,
  watchTask
);