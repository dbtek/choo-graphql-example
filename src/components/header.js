var html = require('choo/html')

module.exports = function headerView (state, emit) {
  return html`
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo"
        autofocus
        placeholder="What needs to be done?"
        onkeydown=${addTodo}
      />
    </header>
  `

  function addTodo (e) {
    if (e.keyCode === 13) {
      emit('todo:add', { text: e.target.value })
      e.target.value = ''
    }
  }
}
