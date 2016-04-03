// Load node modules.
var fs = require('fs');
var marked = require('marked');
var frontMatter = require('front-matter');
var prism = require('prismjs');

// BrowserSync.
var browserSync = require('browser-sync');
var themeServer = browserSync.create('theme')
var styleguideServer = browserSync.create('styleguide')

// Include plugins.
var gulp = require('gulp');
var markdown = require('gulp-markdown');
var data = require('gulp-data');
var swig = require('gulp-swig');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');
var shell = require('gulp-shell');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var autoprefix = require('gulp-autoprefixer');
var glob = require('gulp-sass-glob');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

// Load config.
var config = require('./config.json');

// CSS.
gulp.task('css', function() {
  return gulp.src(config.css.src)
    .pipe(glob())
    .pipe(plumber({
      errorHandler: function (error) {
        notify.onError({
          title:    "Gulp",
          subtitle: "Failure!",
          message:  "Error: <%= error.message %>",
          sound:    "Beep"
        }) (error);
        this.emit('end');
      }}))
    .pipe(sourcemaps.init())
    .pipe(sass({
      style: 'compressed',
      errLogToConsole: true,
      includePaths: config.css.includePaths
    }))
    .pipe(autoprefix('last 2 versions', '> 1%', 'ie 9', 'ie 10'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.css.dest));
});

// Compress images.
gulp.task('images', function () {
  return gulp.src(config.images.src)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngcrush()]
    }))
    .pipe(gulp.dest(config.images.dest));
});

// Fonts.
gulp.task('fonts', function() {
  return gulp.src(config.fonts.src)
    .pipe(gulp.dest(config.fonts.dest));
});

gulp.task('watch', function() {
  gulp.watch(config.css.src, ['css']);
  gulp.watch(config.images.src, ['images']);
  gulp.watch('assets/css/**/*').on('change', themeServer.reload);
})

// Static Server + Watch
gulp.task('serve', ['css', 'fonts', 'watch'], function() {
  themeServer.init({
    proxy: config.browserSyncProxy,
    notify: false,
    port: 3000,
    ui: false
  });

  gulp.watch('assets/css/**/*').on('change', themeServer.reload);
});

// Default Task
gulp.task('default', ['serve']);

// Gulp 'styleguide' task.
gulp.task('build-styleguide', function() {
  gulp.src(config.styleguide.path + '/templates/index.html')
    .pipe(data(function() {
      return buildStyleguideSections();
    }))
    .pipe(swig())
    .pipe(gulp.dest(config.styleguide.path + '/public'));
});

// Static Server + Watch
gulp.task('styleguide', ['css', 'fonts', 'watch', 'build-styleguide'], function() {
  styleguideServer.init({
    port: 3001,
    ui: false,
    notify: false,
    server: {
      baseDir: ['./', config.styleguide.path + '/public'],
      index: 'index.html'
    }
  });

  gulp.watch('assets/css/**/*').on('change', styleguideServer.reload);
  gulp.watch(config.styleguide.src, ['build-styleguide']);
  gulp.watch(config.styleguide.path + '/public/**/*').on('change', styleguideServer.reload);
});

// Custom renderer for marked.
var renderer = new marked.Renderer();

// Language extensions for marked.
var extensions = {
  js: 'javascript',
  scss: 'css',
  html: 'markup'
};

// Override the code callback for marked.
renderer.code = function(code, language, escaped) {
  code = this.options.highlight(code, language);

  if (!language) {
    return '<pre><code>' + code + '\n</code></pre>';
  }

  // e.g. "language-css"
  var languageClass = this.options.langPrefix + language;
  return '<pre class="' + languageClass + '"><code class="' + languageClass + '">' +
    code +
    '</code></pre>\n';
};

// Build sections for styleguide.
function buildStyleguideSections() {
  var sections = [];
  config.styleguide.sections.map(function(section) {
    section.name = section.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    section.files = [];
    section.tree.map(function(path) {
      if (typeof path === 'string') {
        var path = config.styleguide.path + '/src/' + path + '.md';
        var data = fs.readFileSync(path, 'utf8');
        var file = frontMatter(data);
        file.content = marked(file.body, {
          gfm: true,
          smartypants: true,
          renderer: renderer,
          langPrefix: 'language-',
          highlight: function(code, lang) {
            if (!prism.languages.hasOwnProperty(lang)) {
              lang = extensions[lang] || 'markup';
            }

            return prism.highlight(code, prism.languages[lang]);
          }
        });
        file.attributes.name = file.attributes.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        section.files.push(file);
      }
    });
    sections.push(section);
  });

  config.styleguide.sections = sections;

  return config;
}
