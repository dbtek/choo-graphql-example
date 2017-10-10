var html = require('choo/html')
var log = require('choo-log')
var choo = require('choo')
var css = require('sheetify')

// inject css
css('todomvc-common/base.css')
css('todomvc-app-css/index.css')

var app = choo()
app.use(log())
app.use(require('./stores/todo'))

app.route('/', require('./pages/main'))
app.mount('body')
