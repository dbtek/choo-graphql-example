var { fetchItems, addItem, deleteItems, updateItem } = require('../api')

module.exports = (state, emitter) => {
  store = {
    // UI store
    editing: null,
    filter: '',
    // real store
    counter: 0,
    items: []
  }

  // expose store to state
  state.todo = store

  emitter.on('DOMContentLoaded', () => {
    fetchItems().then(data => {
      store.items = [].concat(data)
      emitter.emit('render')
    })
  })

  emitter.on('todo:add', data => {
    var newItem = {
      id: store.counter,
      text: data.text,
      done: false
    }
    addItem(newItem)
      .then(data => {
        store.counter++
        store.items.push(data)
        emitter.emit('render')
      })
  })

  emitter.on('todo:toggle', data => {
    var idx = 0
    var item
    for (i in store.items) {
      item = store.items[i]
      if (item.id === data.id) {
        idx = i
        break
      }
    }
    updateItem({id: data.id, done: !item.done}).then(res => {
      store.items[idx] = Object.assign({}, item, res)
      emitter.emit('render')
    })
  })

  emitter.on('todo:edit', data => {
    store.editing = data.id
    emitter.emit('render')
  })

  emitter.on('todo:cancelEditing', data => {
    return { editing: null }
    emitter.emit('render')
  })

  emitter.on('todo:update', data => {
    store.editing = false
    updateItem(data).then(item => {
      for (item of store.items) {
        if (item.id === data.id)
          item.text = data.text
      }
      emitter.emit('render')
    })
  })

  emitter.on('todo:destroy', data => {
    deleteItems([data]).then(result => {
      store.items = store.items.filter(todo => todo.id !== result[0].id)
      emitter.emit('render')
    })
  })

  emitter.on('todo:clearCompleted', data => {
    var itemsToDelete = store.items.filter(todo => todo.done)
    deleteItems(itemsToDelete).then(deletedItems => {
      store.items = store.items.filter(todo => !todo.done)
      emitter.emit('render')
    })
  })

  emitter.on('todo:toggleAll', data => {
    var allDone = store.items.filter(todo => todo.done).length === store.items.length
    for (item of store.items) {
      item.done = !allDone
    }
    emitter.emit('render')
  })

  emitter.on('todo:filter', data => {
    store.filter = data.filter
    emitter.emit('render')
  })
}
