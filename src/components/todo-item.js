var html = require('choo/html')

module.exports = function todoItemView (todo, editing, emit) {
  console.log('render', todo)
  return html`
    <li class=${classList({ completed: todo.done, editing: editing })}>
      <div class="view">
        <input
          type="checkbox"
          class="toggle"
          checked=${todo.done}
          onchange=${toggle}
        />
        <label ondblclick=${edit}>${todo.text}</label>
        <button
          class="destroy"
          onclick=${destroy}
        ></button>
      </div>
      <input
        class="edit"
        value=${todo.text}
        onkeydown=${handleEditKeydown}
        onblur=${update}
      />
    </li>
  `

  function toggle (e) {
    emit('todo:toggle', { id: todo.id })
  }

  function edit (e) {
    emit('todo:edit', { id: todo.id })
  }

  function destroy (e) {
    emit('todo:destroy', { id: todo.id })
  }

  function update (e) {
    emit('todo:update', { id: todo.id, text: e.target.value })
  }

  function handleEditKeydown (e) {
    if (e.keyCode === 13) { // Enter
      update(e)
    } else if (e.code === 27) { // Escape
      emit('todo:cancelEditing')
    }
  }
}

function classList (classes) {
  return Object.keys(classes).reduce(function (acc, k) {
    if (classes[k]) {
      acc.push(k)
    }
    return acc
  }, []).join(' ')
}
