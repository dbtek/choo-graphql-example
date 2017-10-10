var html = require('choo/html')
var headerView = require('../components/header')
var todoListView = require('../components/todo-list')
var footerView = require('../components/footer')

module.exports = (state, emit) => {
  return html `
    <body>
      <section class="todoapp">
        ${headerView(state, emit)}
        ${todoListView(state, emit)}
        ${footerView(state, emit)}
      </section>
      <footer class="info">
        <p>Double-click to edit a todo</p>
        <p>Created by <a href="http://twitter.com/dbtek">Ismail Demirbilek</a></p>
      </footer>
    </body>
  `
}