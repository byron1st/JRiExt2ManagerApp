const del = require('del')
const gulp = require('gulp')
const babel = require('gulp-babel')
const electronMocha = require('gulp-electron-mocha')
const sourcemaps = require('gulp-sourcemaps')
const fs = require('fs')

const JS_FILE_LIST = ['src/**/*.js', 'src/**/*.jsx']
const JS_TEST_FILE_LIST = ['test/**/*.js']
const COPY_LIST = {
  src: ['src/**/*.css', 'src/**/app.mode.json', 'src/**/*.html'],
  compiled: ['compiled/**/*'],
  public: ['public/**/*']
}

const COMPILED_DEST = 'compiled'
const COMPILED_TEST_DEST = 'compiled-test'
const PACKAGED_DEST = 'app'

const COMPILE_TASKS = ['copy:src', 'compile:js', 'compile:test']

gulp.task('del:compiled', () => {
  return del.sync([COMPILED_DEST + '/**/*', COMPILED_TEST_DEST + '/**/*'])
})

gulp.task('compile:js', ['del:compiled'], () => {
  return gulp.src(JS_FILE_LIST)
    .pipe(sourcemaps.init())
      .pipe(babel({
        'presets': ['es2015', 'react']
      }))
    .pipe(sourcemaps.write('../maps', {includeContent: false, sourceRoot: '../src'}))
    .pipe(gulp.dest(COMPILED_DEST))
})

gulp.task('copy:src', ['del:compiled'], () => {
  return gulp.src(COPY_LIST.src)
    .pipe(gulp.dest(COMPILED_DEST))
})

gulp.task('compile:test', ['del:compiled'], () => {
  return gulp.src(JS_TEST_FILE_LIST)
    .pipe(babel({
      'presets': ['es2015', 'react']
    }))
    .pipe(gulp.dest(COMPILED_TEST_DEST))
})

gulp.task('test', COMPILE_TASKS, () => {
  return gulp.src(COMPILED_TEST_DEST + '/test.js', {read: false})
    .pipe(electronMocha.default())
})

gulp.task('del:app', ['test'], () => {
  return del.sync([PACKAGED_DEST + '/**/*'])
})

gulp.task('copy', ['del:app'], () => {
  gulp.src(COPY_LIST.compiled)
    .pipe(gulp.dest(PACKAGED_DEST + '/compiled'))
  return gulp.src(COPY_LIST.public)
    .pipe(gulp.dest(PACKAGED_DEST + '/public'))
})

gulp.task('package', ['copy'], () => {
  let devPkg = JSON.parse(fs.readFileSync('package.json'))
  let prodPkg = {
    name: devPkg.name,
    version: devPkg.version,
    description: devPkg.description,
    main: devPkg.main,
    author: devPkg.author,
    license: devPkg.license,
    dependencies: devPkg.dependencies
  }
  fs.writeFileSync(PACKAGED_DEST + '/package.json', JSON.stringify(prodPkg))
  fs.writeFileSync(PACKAGED_DEST + '/compiled/main/app.mode.json', JSON.stringify({ 'mode': 'production' }))
})
