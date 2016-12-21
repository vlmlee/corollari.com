const express = require('express'),
    expressSanitized = require('express-sanitized'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    compress = require('compression'),
    hbs = require('hbs'),
    fs = require('fs');

// "controllers"
const routes = require('./routes/index'),
    users = require('./routes/users'),
    projects = require('./routes/projects'),
    blog = require('./routes/blog'),
    resume = require('./routes/resume'),
    contact = require('./routes/contact');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// use gzip compression
app.use(compress());

// loads Handlebars partials
const partialsDir = __dirname + '/views/partials',
    filenames = fs.readdirSync(partialsDir);

filenames.forEach(function(filename) {
    const matches = /^([^.]+).hbs$/.exec(filename);
    if (!matches) {
        return;
    }
    const name = matches[1];
    const template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
    hbs.registerPartial(name, template);
});

hbs.registerHelper('list', function(from, to, context, options) {
    var item = "";
    for (var i = from, j = to; i < j; i++) {
        item = item + options.fn(context[i]);
    }
    return item;
});

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSanitized());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', routes);
app.use('/users', users);
app.use('/projects', projects);
app.use('/blog', blog);
app.use('/resume', resume);
app.use('/contact', contact);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var livereload = require('livereload').createServer({
    exts: ['js', 'css', 'hbs', 'scss']
});

livereload.watch(__dirname + "/views");
livereload.watch(__dirname + "/public");

module.exports = app;
