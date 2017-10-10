var html = require('choo/html')

module.exports = function footerView (state, emit) {
  var activeCount = state.todo.items.filter(function (todo) {
    return !todo.done
  }).length
  var hasDone = state.todo.items.filter(function (todo) {
    return todo.done
  }).length > 0

  return html`
    <footer class="footer">
      <span class="todo-count">
        <strong>${activeCount}</strong>
        item${state.todo.items.length === 1 ? '' : 's'} left
      </span>
      <ul class="filters">
        ${filterButton('All', '', state.todo.filter, emit)}
        ${filterButton('Active', 'active', state.todo.filter, emit)}
        ${filterButton('Completed', 'completed', state.todo.filter, emit)}
      </ul>
      ${hasDone ? clearCompletedButton(emit) : ''}
    </footer>
  `
}

function filterButton (text, filter, currentFilter, emit) {
  var className = filter === currentFilter ? 'selected' : ''

  return html`
    <li>
      <a href="#" class=${className} onclick=${applyFilter}>${text}</a>
    </li>
  `

  function applyFilter () {
    emit('todo:filter', { filter: filter })
  }
}

function clearCompletedButton (emit) {
  return html`
    <button
      class="clear-completed"
      onclick=${clearCompleted}
    >Clear completed</button>
  `

  function clearCompleted () {
    emit('todo:clearCompleted')
  }
}
