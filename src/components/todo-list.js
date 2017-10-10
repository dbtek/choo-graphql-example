var html = require('choo/html')
var todoItemView = require('./todo-item')

module.exports = (state, emit) => {
  var items = state.todo.items
  var filteredItems = filterTodos(items, state.todo.filter)
  var itemViews = filteredItems.map(function (todo) {
    return todoItemView(todo, todo.id === state.todo.editing, emit)
  })
  var allDone = items.filter(isDone).length === items.length

  return html`
    <section class="main">
      <input
        class="toggle-all"
        type="checkbox"
        checked=${allDone}
        onchange=${toggleAll}
      />
      <label for="toggle-all" style="display: none;">Mark all as complete</label>
      <ul class="todo-list">${itemViews}</ul>
    </section>
  `

  function toggleAll () {
    emit('todo:toggleAll')
  }
}

function filterTodos (items, filter) {
  switch (filter) {
    case 'active':
      return items.filter(isNotDone)
    case 'completed':
      return items.filter(isDone)
    default:
      return items
  }
}

function isDone (todo) {
  return todo.done
}

function isNotDone (todo) {
  return !todo.done
}
